import { Modal } from "./UI/Modal"
import { Map } from "./UI/Map"
import { getCoordsFromAddress, getAddressFromCoords } from "./Utility/Location"

class PlaceFinder {
    constructor(){
        const addressForm = document.querySelector('form')
        const locateUserBtn = document.getElementById('locate-btn')
        this.shareBtn = document.getElementById('share-btn')

        locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this))
        this.shareBtn.addEventListener('click', this.sharePlaceHandler)
        addressForm.addEventListener('submit', this.findAddressHandler.bind(this))
    }

    sharePlaceHandler(){
        const shareLinkInputElement = document.getElementById('share-link')
        if(!navigator.Clipboard){
            shareLinkInputElement.select()
            return
        }

        navigator.clipboard.writeText(shareLinkInputElement.value)
        .then(()=>{
            alert('Copied into clipboard!')
        })
        .catch(err => {
            console.log(err);
            shareLinkInputElement.select()
        })
    }
    
    selectPlace(coordinates, address){
        if(this.map){
            this.map.render(coordinates)
        }else{
            this.map = new Map(coordinates)
        }

        this.shareBtn.disabled = false
        const shareLinkInputElement = document.getElementById('share-link')
        shareLinkInputElement.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${coordinates.lng}`
    }

    locateUserHandler(){
        if(!navigator.geolocation){
            alert('Location feature is not available')
            return
        }
        
        const modal = new Modal('loading-modal-content', 'Loading Location - Please Wait')
        modal.show()

        navigator.geolocation.getCurrentPosition(async successResult => {
            const coordinates = {
                lat: successResult.coords.latitude,
                lng: successResult.coords.longitude
            }
            const address = await getAddressFromCoords(coordinates)
            modal.hide()
            console.log(coordinates);
            this.selectPlace(coordinates, address)
        }, error => {
            modal.hide()
            alert('Could not locate you. Enter manually')
        })
    }

    async findAddressHandler(event){
        event.preventDefault()
        const address = event.target.querySelector('input').value
        if(!address || address.trim().length === 0){
            alert('Invalid address entered - Please try again')
            return 
        }
        const modal = new Modal('loading-modal-content', 'Loading Location - Please Wait')
        modal.show()
        try{
            const coordinates = await getCoordsFromAddress(address)
            this.selectPlace(coordinates, address)
        }catch(err){
            alert(err.message)
        }
        modal.hide()
    }
}

new PlaceFinder()
