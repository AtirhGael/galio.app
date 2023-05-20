import React, {useState} from "react"
import {useDropzone} from "react-dropzone"
import {Check, Cloud, Trash2} from 'react-feather';
import {Grid} from "@material-ui/core";
import MySnackbar from "../../../../../components/mySnackbar";
import {FormattedMessage} from "react-intl";

export default function CVDropzoneProgrammatically({context}) {

    const [files, setFiles] = useState([])
    const [openSb, setOpenSb] = useState(false)

    const {getRootProps, getInputProps, open} = useDropzone({
        accept: "application/pdf",
        noClick: true,
        noKeyboard: true,
        onDrop: async acceptedFiles => {
            setFiles(acceptedFiles)
        }
    })

    return (
        <div className='w-full'>
            <section className='flex justify-center items-center'
                     style={{width: '100%', height: '100%'}}>
                <MySnackbar
                    open={openSb}
                    message={"Maximum file size exceeded"}
                    severiry={"error"}
                    setClose={() => setOpenSb(false)}
                />
                {files.length > 0 ? (<div style={{width: '100%'}}>
                        <div className="dz-thumb" key={files[0].name}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} className='py-0'>
                                    <div
                                        className='flex flex-wrap justify-center items-center file-item py-2 px-1'>
                                        <div className='col-12 col-md pr-0 text-nowrap overflow-hidden px-1'
                                             style={{textOverflow: 'ellipsis', maxWidth: 200}}>{files[0].name}</div>
                                        <div
                                            className='col-12 col-md-3 mt-3 md:mt-0 file-item-action bg-white shadow flex items-center py-2 justify-center'>
                                            <Check className='mr-5 mr-md-1' style={{height: 16}}
                                                   onClick={() => {
                                                       context.uploadCV(files)
                                                       setFiles([])
                                                   }}/>
                                            <Trash2 style={{height: 16}} onClick={() => setFiles([])}/>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>) :
                    <div {...getRootProps({className: "dropzone flex justify-center items-center"})}
                         style={{width: '100%', height: '100%'}}>
                        <input {...getInputProps()} />
                        <div className='text-center flex items-center'><Cloud/> &nbsp;&nbsp; <span
                            /*onClick={open}><FormattedMessage id={text || 'Upload file here'}/></span>*/
                            onClick={open}><FormattedMessage id="Upload your CV file here"/></span>
                        </div>
                    </div>}
            </section>
        </div>
    )
}