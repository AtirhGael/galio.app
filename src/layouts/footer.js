import {Facebook, Instagram, Linkedin, Twitter} from "react-feather";
import React from "react";
import {FormattedMessage} from "react-intl";
import CookieC from "../constants/cookie.c";
import {GlobalContext} from "../utilities/Global";
import {Button} from "@material-ui/core";

export default function Footer() {
  return <GlobalContext.Consumer>
    {context => (
      <div className="text-black-50 relative w-full table-row-group h-24" style={{height: 40}} id="footer">
        <div className='px-52'>
          <div className='border-t'>
            <div className='flex items-center h-full py-2 flex-wrap w-full'>
              <div className='flex flex-1 flex-wrap items-center'>
                <div className='flex text-left flex-wrap w-full items-center'>
                  <a href="mailto:numerique.educatif@myiuc.com" className='mr-md-5'><FormattedMessage id={'Technical support'}/></a>
                  <div className='md:mr-5 text-center md:text-left justify-center md:justify-start'
                    onClick={() => context.navigate('/privacy-policy')}><FormattedMessage id={'Privacy policy'}/></div>
                  <div
                    className='my-1 md:my-0 text-center md:text-left justify-center md:justify-start'
                    onClick={() => context.navigate('/terms-of-use')}><FormattedMessage id={'Terms of use'}/></div>
                </div>
              </div>
              <div className='flex flex-1 md:flex-grow-0 text-center p-0 text-left justify-center md:justify-start items-center whitespace-nowrap'>
                <FormattedMessage id={'Follow us'}/> &nbsp;&nbsp;
                <a href='https://www.facebook.com/IucDouala' target='_blank' rel="noreferrer">
                  <Facebook size={16} className='rounded mr-4'/>
                </a>
                <a href='https://twitter.com/iucdouala' target='_blank' rel="noreferrer">
                  <Twitter size={16} className='rounded mr-4'/>
                </a>
                <a href='https://cm.linkedin.com/in/iucdouala' target='_blank' rel="noreferrer">
                  <Linkedin size={16} className='rounded mr-4'/>
                </a>
                <a href='https://www.instagram.com/iucdouala' target='_blank' rel="noreferrer">
                  <Instagram size={16} className='rounded'/>
                </a>
              </div>
              <div className='flex whitespace-nowrap items-center md:ml-4'>
                Version :<Button style={{paddingLeft: 4, paddingRight: 4}} onClick={() => context.setState({openFeature: true})}>{CookieC.VERSION}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </GlobalContext.Consumer>
}
