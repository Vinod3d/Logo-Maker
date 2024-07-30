import React, { useContext, useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider"
import ColorPickerController from './ColorPickerController'
import { UpdateStorageContext } from "@/context/UpdateStorageContext";

const BackgroundController = () => {
  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);

  const storageValue = JSON.parse(localStorage.getItem("value")) || {};
  const { bgRounded = 0, bgPadding = 40, bgColor = "rgba(255,255,255,1)" } = storageValue;

  const [rounded, setRounded] = useState(bgRounded);
  const [padding, setPadding] = useState(bgPadding);
  const [color, setColor] = useState(bgColor);

    
    useEffect(()=>{
        const updatedValue={
            ...storageValue,
            bgRounded:rounded,
            bgPadding:padding,
            bgColor:color
        }

        setUpdateStorage(updatedValue);
        localStorage.setItem('value', JSON.stringify(updatedValue));
    }, [rounded, padding, color])

  return (
    <div>
      <div className="py-2">
        <label className="p-2 flex justify-between">
          Rounded<span>{rounded}px</span>
        </label>
        <Slider
          defaultValue={[0]}
          max={512}
          step={1}
          onValueChange={(e) => setRounded(e[0])}
        />
      </div>

      <div className="py-2">
        <label className="p-2 flex justify-between">
          Padding<span>{padding}px</span>
        </label>
        <Slider
          defaultValue={[40]}
          max={100}
          step={1}
          onValueChange={(e) => setPadding(e[0])}
        />
      </div>

        <div className='py-2 pb-24'>
            <label className='p-2 flex justify-between'>Icon Color</label>
            <ColorPickerController hideController={false} selectedColor={(color)=>setColor(color)}/>
        </div>
    </div>
  );
};

export default BackgroundController;
