import React from 'react'
import { SvgIcon, Box, Typography} from '@mui/material'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import '../../InfoLoginComponent.css'


function CardInfoComponent({userObject}) {
  return (
    userObject ? 
        <Box className="mi-componente">
            <Box className="fondo">
                <Box className="contenido">
                    <h2>{userObject.title}</h2>
                </Box>
            </Box>
            <Box className="descripcion">
                <h3>{userObject.subtitle}</h3>
                <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                    <Box sx={{display:'flex', flexDirection:'column', alignItems:'start', textAlign:'center', m:1}}>
                        {
                            userObject.listItems.map((list, index) =>(
                                <Box sx={{display:'flex',  alignItems: 'center', gap:2, justifyContent:'flex-start', textAlign:'justify', mt:1}} key={index}>
                                    <SvgIcon component={DirectionsCarIcon} fontSize="medium"/>
                                    <Typography sx={{}}>{list}</Typography>
                                 </Box>
                            ))
                        }    
                    </Box>
                    <Box mt={2}>
                        <Typography>¿Aún no te registras? <em><strong>Hazlo ahora!</strong></em></Typography>
                    </Box>
                </Box>    
            </Box>
        </Box>
    :
        <></> 
    )
}

export default CardInfoComponent