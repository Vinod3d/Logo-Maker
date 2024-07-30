import { Smile } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { Slider } from "@/components/ui/slider"
import ColorPickerController from './ColorPickerController'
import { UpdateStorageContext } from '@/context/UpdateStorageContext'
import IconList from './IconList'


const IconController = () => {
    const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);

    const storageValue = JSON.parse(localStorage.getItem('value')) || {};
    const { iconSize = 280, iconRotate = 0, iconColor = 'rgba(255,255,255,1)',  } = storageValue;

    const [size, setSize] = useState(iconSize);
    const [rotate, setRotate] = useState(iconRotate);
    const [color, setColor] = useState(iconColor);
    const [icon, setIcon] = useState(storageValue?.icon || 'Smile');


    useEffect(()=>{
        const updatedValue={
            ...storageValue,
            iconSize:size,
            iconRotate:rotate,
            iconColor:color,
            icon: icon
        }

        setUpdateStorage(updatedValue);
        localStorage.setItem('value', JSON.stringify(updatedValue));
    }, [size, rotate, color, icon])

  return (
    <div>
        <div>
            <IconList selectedIcon={(icon)=>setIcon(icon)}/>
            <div className='py-2'>
                <label className='p-2 flex justify-between'>Size<span>{size }px</span></label>
                <Slider defaultValue={[280]} max={512} step={1} 
                    onValueChange={(e)=>setSize(e[0])}
                />
            </div>

            <div className='py-2'>
                <label className='p-2 flex justify-between'>Rotate<span>{rotate}°</span></label>
                <Slider defaultValue={[0]} max={360} step={1} 
                    onValueChange={(e)=>setRotate(e[0])}
                />
            </div>
            <div className='py-2 pb-24'>
                <label className='p-2 flex justify-between'>Icon Color</label>
                <ColorPickerController hideController={true} selectedColor={(color)=>setColor(color)}/>
            </div>
        </div>
    </div>
  )
}

export default IconController