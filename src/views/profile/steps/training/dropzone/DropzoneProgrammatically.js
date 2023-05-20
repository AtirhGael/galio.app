import React, {useState} from "react"
import {useDropzone} from "react-dropzone"
import {Check, Cloud, Trash2} from 'react-feather';
import {FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import {GlobalContext} from "../../../../../utilities/Global";
import {FormattedMessage} from "react-intl";
import {convertImage} from "../../../../../helpers/func.h";
import MySnackbar from "../../../../../components/mySnackbar";
import AlertDesignation from "../alertDesignation";

export default function ProgrammaticallyDropzone() {
  const [files, setFiles] = useState([])
  const [openSb, setOpenSb] = useState(false)
  const [openA, setOpenA] = useState(false)
  
  const {getRootProps, getInputProps, open} = useDropzone({
    accept: "image/jpeg, image/jpg, image/png, application/pdf",
    noClick: true,
    noKeyboard: true,
    onDrop: async acceptedFiles => {
      let fileSize = acceptedFiles[0].size / (1024 * 1024)
      if (fileSize <= 2) {
        setFiles(acceptedFiles)
      } else {
        let file = await convertImage(acceptedFiles[0])
        setFiles([file])
      }
    }
  })
  
  return (
    <GlobalContext.Consumer>
      {context => {
        return <section className='flex justify-center items-center'
                        style={{width: '100%', height: '100%'}}>
          <MySnackbar
            open={openSb}
            message={"Maximum file size exceeded"}
            severiry={"error"}
            setClose={() => setOpenSb(false)}
          />
          <AlertDesignation open={openA} setClose={() => setOpenA(false)}/>
          {files.length > 0 ? (<div style={{width: '100%'}}>
              <div className="dz-thumb px-3 py-4" key={files[0].name}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label={<FormattedMessage id="Diploma or certification designation"/>}
                      value={context.state.DESIGNATION}
                      onChange={e => context.setState({DESIGNATION: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label={<FormattedMessage id="Specialty"/>}
                      value={context.state.SPECIALITY}
                      onChange={e => context.setState({SPECIALITY: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label"><FormattedMessage id="Achievement level"/></InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={context.state.LEVEL}
                        onChange={e => context.setState({LEVEL: e.target.value})}
                      >
                        <MenuItem value={1}>BAC+1</MenuItem>
                        <MenuItem value={2}>BAC+2</MenuItem>
                        <MenuItem value={3}>BAC+3</MenuItem>
                        <MenuItem value={4}>BAC+4</MenuItem>
                        <MenuItem value={5}>BAC+5</MenuItem>
                        <MenuItem value={6}>BAC+6</MenuItem>
                        <MenuItem value={7}>BAC+7</MenuItem>
                        <MenuItem value={8}>BAC+8</MenuItem>
                        <MenuItem value={9}>BAC+9 ou plus</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label"><FormattedMessage id="Teaching language"/></InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={context.state.LANGUAGE}
                        onChange={e => context.setState({LANGUAGE: e.target.value})}
                      >
                        <MenuItem value='en'><FormattedMessage id="English"/></MenuItem>
                        <MenuItem value='fr'><FormattedMessage id="French"/></MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth required>
                      <InputLabel shrink><FormattedMessage id="Obtention date"/></InputLabel>
                      <Input
                        type="date"
                        value={context.state.OBTENEDDATE}
                        onChange={e => context.setState({OBTENEDDATE: e.target.value})}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label={<FormattedMessage id="Obtention institution"/>}
                      value={context.state.OBTENEDSTAB}
                      onChange={e => context.setState({OBTENEDSTAB: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div className='flex flex-wrap items-center file-item py-2 px-2'>
                      <div className='col-12 col-md-7 pr-0'>{files[0].name}</div>
                      <div
                        className='col-12 col-md-5 mt-3 md:mt-0 file-item-action bg-white shadow flex items-center py-2 justify-center'>
                        <div className='cursor-pointer small' onClick={() => {
                          if (context.state.DESIGNATION?.indexOf("/") >= 0 || context.state.SPECIALITY?.indexOf("/") >= 0) {
                            setOpenA(true)
                            return
                          }
                          
                          context.createDiploma(files)
                          setFiles([])
                          
                        }}>
                          <Check className='mr-5 mr-md-1' style={{height: 16}}/>
                          <FormattedMessage id={"Save Continue"}/>
                        </div>
                        &nbsp;
                        &nbsp;
                        <div className='small cursor-pointer'>
                          <Trash2 style={{height: 16}} onClick={() => setFiles([])}/>
                          <FormattedMessage id={"Cancel"}/>
                        </div>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>) :
            <div {...getRootProps({className: "dropzone flex justify-center items-center"})}
                 style={{width: '100%', height: '100%'}}>
              <input {...getInputProps()} />
              <div className='text-center flex items-center'><Cloud/> &nbsp; <FormattedMessage id="Drop files here"/><span
                onClick={open} className='ml-2'><FormattedMessage id="Choose file"/></span></div>
            </div>}
        </section>
      }}
    </GlobalContext.Consumer>
  )
}