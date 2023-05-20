import React, {useState} from "react"
import {useDropzone} from "react-dropzone"
import {Cloud, Trash2} from 'react-feather';
import {Grid} from "@material-ui/core";
import {blobToBase64} from "base64-blob";
import MySnackbar from "../../../../../components/mySnackbar";
import {FormattedMessage} from "react-intl";
import {convertImage} from "../../../../../helpers/func.h";

export default function DropzoneProgrammatically({col, submit, text, context}) {

    const [files, setFiles] = useState([])
    const [openSb, setOpenSb] = useState(false)

    const {getRootProps, getInputProps, open} = useDropzone({
        accept: "image/jpeg, image/jpg, image/png, application/pdf",
        noClick: true,
        noKeyboard: true,
        onDrop: async acceptedFiles => {
            let fileSize = acceptedFiles[0].size / (1024 * 1024)
            if (fileSize <= 2) {
                setFiles(acceptedFiles)
                let obj = {}
                obj[col] = await blobToBase64(acceptedFiles[0])
                obj[submit] = false
                context.setState({...obj})
            } else {
                let obj = {}
                if (acceptedFiles[0].type.split('/')[0] === 'image') {
                    let file = await convertImage(acceptedFiles[0])
                    setFiles([file])
                    obj[col] = await blobToBase64(file)
                } else {
                    setFiles(acceptedFiles)
                    obj[col] = await blobToBase64(acceptedFiles[0])
                }
                obj[submit] = false
                context.setState({...obj})
            }
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
                                        className='flex flex-wrap justify-center flex-nowrap items-center file-item py-2 px-1'>
                                        <div className='col-12 flex-nowrap whitespace-nowrap col-md pr-0 text-nowrap overflow-hidden px-1'
                                             style={{textOverflow: 'ellipsis', maxWidth: 150}}>{files[0].name}</div>
                                        <div
                                            className='col-12 col-md-3 mt-3 md:mt-0 file-item-action ml-1 bg-white shadow flex items-center py-2 justify-center'>
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
                        <div className='text-center flex pr-3 pl-2 text-xs flex items-center'><Cloud/> &nbsp;&nbsp; <span
                            onClick={open}><FormattedMessage id={text || 'Upload file here'}/></span>
                        </div>
                    </div>}
            </section>
        </div>
    )
}