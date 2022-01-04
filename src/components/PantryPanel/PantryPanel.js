import React, { useState } from 'react'
import './PantryPanel.css'
import PantryCreation from '../PantryCreation/PantryCreation'

const PantryPanel = (props) => {

    const [shopContent, setShopContent] = useState(props.content)

    const pantryContent = [
        {img_url : 'http://www.leclerc.rzeszow.pl/foto_shop/177/5906040063522_T1.jpg', name : "masło", count : 3},
        {img_url : 'http://www.leclerc.rzeszow.pl/foto_shop/177/5906040063522_T1.jpg', name : "bułka", count : 2},
        {img_url : 'https://www.pngall.com/wp-content/uploads/2016/04/Carrot-PNG.png', name : "cebula", count : 2},
        {img_url : 'https://www.pngall.com/wp-content/uploads/2016/04/Carrot-PNG.png', name : "marchew 250g", count : 2},
        {img_url : 'https://e-delikatesydwojka.pl//app/uploads/2019/12/szynka_z_kotla.png', name : "szynka 200g", count : 2},
        {img_url : 'https://e-delikatesydwojka.pl//app/uploads/2019/12/szynka_z_kotla.png', name : "ketchup", count : 2},
        {img_url : 'http://www.leclerc.rzeszow.pl/foto_shop/177/5906040063522_T1.jpg', name : "ryż biały", count : 2},
        {img_url : 'https://e-delikatesydwojka.pl//app/uploads/2019/12/szynka_z_kotla.png', name : "sól 1kg", count : 2},
        {img_url : 'http://www.leclerc.rzeszow.pl/foto_shop/177/5906040063522_T1.jpg', name : "ziemniak", count : 2},
        {img_url : 'https://www.pngall.com/wp-content/uploads/2016/04/Carrot-PNG.png', name : "mleko", count : 6},
        {img_url : 'http://www.leclerc.rzeszow.pl/foto_shop/177/5906040063522_T1.jpg', name : "jogurt naturalny", count : 2}]
    
    pantryContent.sort(function (a, b) {
        if (a.name > b.name) {
            return 1;
        }
        if (b.name > a.name) {
            return -1;
        }
        return 0;
    });

    return(
    <div>
        <PantryCreation shopContent={shopContent} pantryContent={pantryContent}></PantryCreation>
    </div>          
    )
}
export default PantryPanel