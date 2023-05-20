import React from "react";
import {IconButton} from "@material-ui/core";
import CookieH from "../../helpers/cookie.h";
import {ArrowLeft} from "react-feather";

let Terms = props => (
  <div className="privacy-terms relative">
    {CookieH.getUser() && <IconButton
      style={{position: "absolute", top: 32, left: 84}}
      className="border"
      onClick={() => props.history?.push('/')}>
      <ArrowLeft/>
    </IconButton>}
    <div className="container h-full py-3 text-justify">
      <h1 className="mt-3 mb-5 text-center">Terms of Service</h1>
      <p>These Terms of Service govern your use of the website located at <a
        href="https://erp.myiuc.com/">https://erp.myiuc.com/</a> and any related services provided by
        IUC. By accessing <a href="https://erp.myiuc.com/">https://erp.myiuc.com/</a>, you agree
        to abide by these Terms of Service and to comply with all applicable laws and regulations. If
        you do not agree with these Terms of Service, you are prohibited from using or accessing this
        website or using any other services provided by IUC. </p>
      
      <p className="border-bottom pb-2">We, IUC, reserve the right to review and amend any of these
        Terms of Service at our sole
        discretion. Upon doing so, we will update this page. Any changes to these Terms of Service will
        take effect immediately from the date of publication. These Terms of Service were last updated
        on 23 March 2021. </p>
      
      <h3 className="my-2">Limitations of Use</h3>
      <p>By using this website, you warrant on behalf of yourself, your users, and other parties you
        represent that you will not: </p>
      <ol>
        <li>modify, copy, prepare derivative works of, decompile, or reverse engineer any materials and
          software contained on this website;
        </li>
        <li>remove any copyright or other proprietary notations from any materials and software on this
          website;
        </li>
        <li>transfer the materials to another person or “mirror” the materials on any other server;</li>
        <li>knowingly or negligently use this website or any of its associated services in a way that
          abuses or disrupts our networks or any other service IUC provides;
        </li>
        <li>use this website or its associated services to transmit or publish any harassing, indecent,
          obscene, fraudulent, or unlawful material;
        </li>
        <li>use this website or its associated services in violation of any applicable laws or
          regulations;
        </li>
        <li>use this website in conjunction with sending unauthorized advertising or spam;</li>
        <li>harvest, collect, or gather user data without the user’s consent; or</li>
        <li>use this website or its associated services in such a way that may infringe the privacy,
          intellectual property rights, or other rights of third parties.
        </li>
      </ol>
      <h3 className="mb-2 mt-4">Intellectual Property</h3>
      <p>The intellectual property in the materials contained in this website are owned by or licensed to
        IUC and are protected by applicable copyright and trademark law. We grant our users
        permission to download one copy of the materials for personal, non-commercial transitory
        use. This constitutes the grant of a license, not a transfer of title. This license shall
        automatically terminate if you violate any of these restrictions or the Terms of Service, and
        may be terminated by IUC at any time. </p>
      
      <h3 className="mb-2 mt-4">Liability</h3>
      <p>Our website and the materials on our website are provided on an 'as is' basis. To the extent
        permitted by law, IUC makes no warranties, expressed or implied, and hereby disclaims and
        negates all other warranties including, without limitation, implied warranties or conditions of
        merchantability, fitness for a particular purpose, or non-infringement of intellectual property,
        or other violation of rights.In no event shall IUC or its suppliers be liable for any
        consequential loss suffered or incurred by you or any third party arising from the use or inability to use
        this website or the
        materials on this website, even if IUC or an authorized representative has been notified,
        orally or in writing, of the possibility of such damage. </p>
      
      <p>In the context of this agreement, &ldquo;consequential loss&rdquo; includes any consequential
        loss, indirect loss, real or anticipated loss of profit, loss of benefit, loss of revenue, loss
        of business, loss of goodwill, loss of opportunity, loss of savings, loss of reputation, loss of
        use and/or loss or corruption of data, whether under statute, contract, equity, tort (including
        negligence), indemnity, or otherwise. </p>
      <p>Because some jurisdictions do not allow limitations on implied warranties, or limitations of
        liability for consequential or incidental damages, these limitations may not apply to you. </p>
      
      <h3 className="mb-2 mt-4">Accuracy of Materials</h3>
      <p>The materials appearing on our website are not comprehensive and are for general information
        purposes only. IUC does not warrant or make any representations concerning the accuracy,
        likely results, or reliability of the use of the materials on this website, or otherwise
        relating to such materials or on any resources linked to this website. </p>
      
      <h3 className="mb-2 mt-4">Others</h3>
      <h5 className="ml-4 mb-2 mt-4">Links</h5>
      <p>IUC has not reviewed all of the sites linked to its website and is not responsible for the
        contents of any such linked site. The inclusion of any link does not imply endorsement,
        approval, or control by IUC of the site. Use of any such linked site is at your own risk
        and we strongly advise you make your own investigations with respect to the suitability of those
        sites. </p>
      <h5 className="ml-4 my-2">Right to Terminate</h5>
      <p>We may suspend or terminate your right to use our website and terminate these Terms of Service
        immediately upon written notice to you for any breach of these Terms of Service. </p>
      <h5 className="ml-4 my-2">Severance</h5>
      <p>Any term of these Terms of Service which is wholly or partially void or unenforceable is severed
        to the extent that it is void or unenforceable. The validity of the remainder of these Terms of
        Service is not affected. </p>
      <h5 className="ml-4 my-2">Governing Law</h5>
      <p>These Terms of Service are governed by and construed in accordance with the laws of Cameroon. You
        irrevocably submit to the exclusive jurisdiction of the courts in that State or location. </p>
    </div>
  </div>
);
export default Terms
