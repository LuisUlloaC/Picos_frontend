import * as React from "react";
import IconButton from '@mui/material/IconButton';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import {Context} from '../context/provider';
import { getContractInfo } from "../../actions/contracts";


export default function DocumentsView({contractId}) {
    const { state, setState, api } = React.useContext(Context);
    const [documents, setDocuments] = React.useState();
    

    React.useEffect(() =>{

        (async () => {
            let response = await getContractInfo(api, contractId);
            if (response.sucess) {
                setDocuments(response.result.templates);
            }
        })();
    }, [])

    return (
        <>
            <div className="title">Documentos</div>
            <div className="list">
                {documents?.map((documento) => (
                    <div key={documento.id}>
                        <IconButton
                        sx={{ '&:hover': { backgroundColor: 'transparent', fontFamily: 'Nico Moji' } }}  
                        style={{ display: 'flex', flexDirection: 'row' }}>
                            <DescriptionOutlinedIcon style={{ fontSize: '10vh', color: '#000' }} />
                            <span>{documento.label}</span>
                        </IconButton>
                    </div>
                ))}
            </div>
        </>
    );
}