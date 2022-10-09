import React from 'react';
import { BoxForService, ButtonSearch, CapsuleForService, CapsuleForBoxes, LabelSerchBoxService, SearchBoxService } from './style';
import { AiOutlineSearch } from "react-icons/ai";

const Services = () =>{
    return(
        <>
       <CapsuleForService>
       <LabelSerchBoxService >
       <SearchBoxService 
       type='search'
       name='serch-service'
       placeholder='Buscar'/>
       <ButtonSearch ><AiOutlineSearch />  </ButtonSearch>
       </LabelSerchBoxService>
       <CapsuleForBoxes>
       <BoxForService>
        AAQUI
       </BoxForService>
       <BoxForService>
        AAQUI
       </BoxForService>
       <BoxForService>
        AAQUI
       </BoxForService>

    
       </CapsuleForBoxes>       
       </CapsuleForService>
       </>
    )
}

export default Services; 