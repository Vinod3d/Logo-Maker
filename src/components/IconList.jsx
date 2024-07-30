import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { iconList } from "@/constants/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Smile, icons } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = 'https://logoexpress.tubeguruji.com'

const IconList = ({selectedIcon}) => {
    const [openDialog, setOpenDialog]= useState(false);
    const [pngIconList, setPngIconList] = useState([]);
    const storageValue = JSON.parse(localStorage.getItem('value')) || {};
    const [icon, setIcon] = useState(storageValue?.icon || 'Smile');


    const Icon = ({name, color, size, rotate})=>{
        const LucidIcon = icons[name];
        if(!LucidIcon){
            return ;
        }

        return <LucidIcon color={color} size={size} 
            style={{
                transform:`rotate(${rotate}deg)`
            }}
        />
    }

    const getPngIcons=()=>{
        axios.get(BASE_URL+'/getIcons.php').then(resp=>{
            console.log(resp.data)
            setPngIconList(resp.data)
        })
    }

    useEffect(()=>{
        getPngIcons();
    }, [])
  return (
    <div>
        <div>
            <label className='p-2 inline-block'>Icon</label>
            <div 
            onClick={()=>setOpenDialog(true)}
            className="p-3 cursor-pointer bg-gray-200 rounded-md w-[50px] h-[50px] flex items-center justify-center">
                {icon?.includes('.png')?
                <img src={BASE_URL+'/png/'+icon} />:
                <Icon name={icon} color={'#000'} size={20}/>
            }
            </div>
        </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
    
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pic Your Favorite Icon</DialogTitle>
            <DialogDescription>
            <Tabs defaultValue="icon" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="icon">Icons</TabsTrigger>
                    <TabsTrigger value="color-icon">Color Icons</TabsTrigger>
                </TabsList>
                <TabsContent value="icon">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 overflow-auto h-[300px] max-w-lg min-w-md p-6 gap-2">
                        {iconList.map((icon, index)=>(
                            <div 
                            key={index}
                            className="border flex rounded-sm items-center justify-center p-3 cursor-pointer hover:bg-gray-200"
                            onClick={()=>{selectedIcon(icon); setOpenDialog(false); setIcon(icon)}}
                            >
                                <Icon name={icon} color={'#000'} size={20}/>
                            </div>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="color-icon">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 overflow-auto h-[300px] max-w-lg min-w-md p-6 gap-2">
                        {pngIconList.map((icon, index)=>(
                            <div 
                            key={index}
                            className="border flex rounded-sm items-center justify-center p-3 cursor-pointer hover:bg-gray-200"
                            onClick={()=>{selectedIcon(icon); setOpenDialog(false); setIcon(icon)}}
                            >
                                <img src={BASE_URL+"/png/"+icon}/>
                            </div>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>

                
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IconList;
