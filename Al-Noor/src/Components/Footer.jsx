import './Footer.css'
import whatsapp_image from '../assets/images/whatsapp.png'
import facebook_image from '../assets/images/facebook.png'
import instagram_image from '../assets/images/social.png'
import youtube_image from '../assets/images/youtube.png'
function Footer(){

    function whatsapp(){
        window.open("https://wa.me/+923431436801", "_blank");
    }
    function facebook(){
        window.open("https://www.facebook.com/profile.php?id=100064627543864", "_blank");
    }
    function instagram(){
    }
    function youtube(){
    }


    return(
        <div className="Footer_Area">


            <div className='Circles' >
                <div className='C_one'>
                    <img  onClick={whatsapp} className='image' src={whatsapp_image} alt="" />
                </div>
                <div className='C_one'>
                <img onClick={facebook} className='image' src={facebook_image} alt="" />
                </div>
                <div className='C_one' >
                <img onClick={instagram} className='image' src={instagram_image} alt="" />
                </div>
                <div className='C_one'>
                <img onClick={youtube} className='image' src={youtube_image} alt="" />
                </div>
                
            </div>
             </div>

    )
}
export default Footer