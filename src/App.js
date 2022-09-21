import initialImg from './assets/forca0.png'
/* import img1 from './assets/forca1.png'
import img2 from './assets/forca2.png'
import img3 from './assets/forca3.png'
import img4 from './assets/forca4.png'
import img5 from './assets/forca5.png'
import img6 from './assets/forca6.png' */


export default function App(){
    return(
        <>
            <FirstDiv/>
        </>
    );
}


function FirstDiv (){
    return(
        <div className='firstDiv'>
            <img src={initialImg} alt={initialImg}/>
            <button onClick={()=>alert('asdasd')}>Escolher Palavra</button>
        </div>
    );
}