import {FormattedMessage} from "react-intl";
import {Info} from "react-feather";
import Icon from "@mdi/react";

const GInput = ({type, startIcon, EndIcon, id, onKeyDown, value, disabled, onChange, label, hint}) => {
  return (
    <div className='relative mt-2 transition-all flex-1'>
      <span className='top-4 mt-0.5 absolute text-gray-400 left-2 inline'>{startIcon}</span>
      <input
        id={id}
        className={`${startIcon ? 'pl-12 pr-4' : 'px-4 '} w-full peer transition-all invalid:border-red-300 invalid:bg-red-50 invalid:bg-opacity-20 py-2 rounded mt-2 focus:shadow-lg focus:valid:border-blue-300 focus:shadow-blue-50 border-gray-100 border`}
        value={value}
        type={type || 'text'}
        disabled={disabled}
        onKeyDown={onKeyDown || ''}
        pattern='.{2,}'
        placeholder=' '
        onChange={onChange}
      />
      <Info size={16} className='top-5 absolute right-2 peer-invalid:text-red-400 hidden peer-invalid:inline'/>
      <Icon path={EndIcon || ''} size={1} className='top-4 absolute right-10 text-black inline'/>
      <label
        htmlFor={id}
        className='peer-focus:peer-valid:text-blue-400 cursor-text transition-all peer-invalid:text-red-500 absolute peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 -top-3.5 left-0 peer-focus:-top-3.5 peer-focus:left-0 text-black text-opacity-60'>
        <FormattedMessage id={label}/>
      </label>
      <div className='text-xs mt-1 ml-1 peer-invalid:text-red-500'><FormattedMessage id={hint}/></div>
    </div>
  )
}
export default GInput