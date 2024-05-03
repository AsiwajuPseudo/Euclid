import React, { useState } from 'react';
import { Row, Col, Menu, Card, Button, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Text, Link,Paragraph, Title} = Typography;

const Terms = (props) => {
  const [selectedSection, setSelectedSection] = useState('section1'); // State to track the selected section

  // Sample data for menu items and corresponding text
  const menuItems = [
    { key: 'section1', title: 'Introduction' },
    { key: 'section2', title: 'Acceptance of Terms' },
    { key: 'section3', title: 'Modification of Terms' },
    { key: 'section4', title: 'User Accounts and Usage' },
    { key: 'section5', title: 'Intellectual Property Rights' },
    { key: 'section6', title: 'User-Generated Content' },
    { key: 'section7', title: 'Privacy Policy' },
    { key: 'section8', title: 'Disclaimer and Limitation of Liability' },
    { key: 'section9', title: 'Indemnification' },
    { key: 'section10', title: 'Subscription, free trial and Refunds' },
    { key: 'section11', title: 'Governing Law' },
    { key: 'section12', title: 'Feedback,Reporting and Contact' },
  ];

  const textData = {
    section1: [
      'Welcome to Case Rover, an innovative legal research platform powered by advanced artificial intelligence technology designed to assist legal professionals in their quest for fast and accurate legal information. This platform provides users with the ability to input queries and receive data-driven insights, making the legal research process more efficient and effective. The following terms and conditions govern your use of Case Rover and are designed to ensure a clear understanding of the operational dynamics and user responsibilities. By accessing or using the platform, you agree to be bound by these terms and conditions.',
      'Definitions',
      "a. 'Platform' refers to the Case Rover software, website, and services provided that facilitate legal research through AI technology.",
      "b. 'Prompt' is the input or query that a user submits to the platform to initiate a search or request information.",
      "c. 'Output' denotes the information, data, or results provided by the platform in response to the user's prompt.",
      "d. 'User' means any individual or entity that accesses or uses the platform for legal research purposes.",
      "e. 'Content' encompasses all information, data, text, software, music, sound, photographs, graphics, video, messages, or other materials.",
      "f. 'Subscription' is the arrangement by which a user gains access to the platform's services, typically through a recurring fee.",
      "g. 'Intellectual Property' refers to creations of the mind for which exclusive rights are recognized, such as patents, copyrights, trademarks, and trade secrets associated with the platform.",
      "h. 'Confidential Information' includes any data or information, oral or written, treated as confidential that a user learns during the course of using the platform or performing any related activities.",
    ],
    section2: [
      "By accessing or using Case Rover ('the Platform'), you ('the User') agree to be bound by these terms and conditions ('Terms'). If you are entering into these Terms on behalf of a business or other legal entity, you represent that you have the authority to bind such entity to these Terms, in which case the terms 'User' shall refer to such entity. If you do not have such authority, or if you do not agree with these Terms, you must not accept these Terms and may not use the services provided by the Platform.",
      "These Terms apply to all users of the Platform, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content. You can review the most current version of the Terms at any time on this page. We reserve the right to update, change or replace any part of these Terms by posting updates and/or changes to our Platform. It is your responsibility to check this page periodically for changes. Your continued use of or access to the Platform following the posting of any changes constitutes acceptance of those changes.",
    ],
    section3: [
      "Case Rover reserves the right, at our sole discretion, to change, modify, add, or remove portions of these terms and conditions at any time without prior notice. It is your responsibility to check these terms periodically for changes. Your continued use of the Platform following the posting of changes will mean that you accept and agree to the changes. As long as you comply with these terms, Case Rover grants you a personal, non-exclusive, non-transferable, limited privilege to enter and use the Platform.",
      "If any modification is not acceptable to you, your only recourse is to cease using the Platform. By continuing to use the Platform after the date any such changes become effective, you agree to be bound by the revised terms and conditions.",
    ],
    section4:[
      "User Accounts and Registration",
      "To access certain features of the Platform, you must register for an account. When you register for an account, you may be required to provide us with some information about yourself, such as your email address or other contact information. You agree that the information you provide to us is accurate and that you will keep it up-to-date at all times. When you register, you will be asked to create a password. You are responsible for maintaining the confidentiality of your account and password, and you are responsible for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account. Case Rover is not responsible for any loss or damage arising from your failure to comply with the above requirements.",
      "Use of another user's account without permission is strictly prohibited. You must be at least the age of majority in your jurisdiction of residence to use the Platform. By registering for an account, you represent and warrant that you are of legal age to form a binding contract and meet all of the foregoing eligibility requirements. If you do not meet all of these requirements, you must not access or use the Platform.",
      "User Responsibilities and Conduct",
      "As a user of Case Rover, you are expected to use the Platform responsibly and in compliance with all applicable laws, regulations, and these Terms. You are solely responsible for all activities conducted through your account. You agree not to engage in any of the following prohibited activities:",
      "a. Using the Platform for any unlawful or fraudulent purpose, or in any manner inconsistent with these Terms.",
      "b. Violating any applicable local, state, national, or international law or regulation.",
      "c. Transmitting any viruses, worms, defects, Trojan horses, or any items of a destructive nature through the Platform.",
      "d. Copying, distributing, or disclosing any part of the Platform in any medium, including without limitation by any automated or non-automated 'scraping'.",
      "e. Using any automated system, including but not limited to 'robots,' 'spiders,' 'offline readers,' etc., to access the Platform in a manner that sends more request messages to the servers than a human can reasonably produce in the same period.",
      "f. Attempting to interfere with, compromise the system integrity or security, or decipher any transmissions to or from the servers running the Platform.",
      "g. Taking any action that imposes, or may impose, an unreasonable or disproportionately large load on Platform infrastructure.",
      "h. Uploading invalid data, viruses, worms, or other software agents through the Platform.",
      "i. Collecting or harvesting any personally identifiable information, including account names, from the Platform.",
      "j. Using the Platform for any commercial solicitation purposes without our express written consent.",
      "k. Impersonating another person or otherwise misrepresenting your affiliation with a person or entity, conducting fraud, hiding, or attempting to hide your identity.",
      "l. Interfering with the proper working of the Platform.",
      "m. Accessing any content on the Platform through any technology or means other than those provided or authorized by the Platform.",
      "n. Bypassing the measures we may use to prevent or restrict access to the Platform, including without limitation features that prevent or restrict use or copying of any content or enforce limitations on use of the Platform or the content therein.",
      "Your interaction with the Platform and other users should be respectful and in good faith. You also agree not to misuse any information available on the Platform for purposes that are not intended by Case Rover. We reserve the right to suspend or terminate your account if you engage in any prohibited conduct as outlined above or if we believe that your actions may cause legal liability for you, our other users, or us.",
    ],
    section5:[
      "Case Rover ('the Platform') is the sole proprietor of all intellectual property rights in and to the service, including but not limited to: the technology, software, algorithms, user interface, designs, content, logos, and any materials provided on the Platform. The use of the Platform does not transfer any of these intellectual property rights to you or any third party. Any unauthorized use, reproduction, or distribution of any content or materials from the Platform is strictly prohibited and may result in legal action.",
      "You may use the Platform for your personal and business research purposes. However, you may not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information, software, products, or services obtained from the Platform without the express written permission from Case Rover.",
      "Case Rover grants you a limited, non-exclusive, non-transferable, revocable license to access and use the Platform strictly in accordance with these terms. This license is solely for enabling you to use and enjoy the benefit of the services as provided by Case Rover, in the manner permitted by these terms.",
      "All trademarks, service marks, and trade names are owned by Case Rover or other respective owners that have granted the Platform the right and license to use such marks. The names and logos of Case Rover may not be used in any way, including in advertising or publicity pertaining to distribution of materials on the Platform, without prior, written permission from Case Rover.",
    ],
    section6:[
      "Users of Case Rover ('the Platform') may submit, upload, or otherwise make available content such as comments, case analyses, articles, links, and other materials ('User-Generated Content'). By providing User-Generated Content to the Platform, you grant Case Rover a worldwide, perpetual, irrevocable, non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate, create derivative works from, distribute, perform, and display such content throughout the world in any media.",
      "You may use the Platform for your personal and business research purposes. However, you may not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information, software, products, or services obtained from the Platform without the express written permission from Case Rover.",
      "Case Rover grants you a limited, non-exclusive, non-transferable, revocable license to access and use the Platform strictly in accordance with these terms. This license is solely for enabling you to use and enjoy the benefit of the services as provided by Case Rover, in the manner permitted by these terms.",
      "All trademarks, service marks, and trade names are owned by Case Rover or other respective owners that have granted the Platform the right and license to use such marks. The names and logos of Case Rover may not be used in any way, including in advertising or publicity pertaining to distribution of materials on the Platform, without prior, written permission from Case Rover.",
    ],
    section7:[
      "Case Rover ('we', 'us', 'our') commits to protecting the privacy of its users ('you', 'your'). This Privacy Policy outlines our practices regarding the collection, use, and sharing of your information through the use of our AI-powered legal research platform ('Service').",
      "Information We Collect:",
      "a. Personal identification information (Name, email address, phone number, etc.)",
      "b. Usage data (search queries, pages visited, time spent on the Service)",
      "How We Use Your Information:",
      "a. To provide and maintain our Service",
      "b. To improve your experience and the platform's features",
      "c. To communicate with you about your account and our services",
      "d. For legal compliance, such as responding to legal requests",
      "Sharing Your Information",
      "We do not share your personal information with third parties, except as necessary to provide the Service, comply with the law, or protect our rights.",
      "Data Security",
      "We implement security measures designed to protect your information from unauthorized access, alteration, or destruction.",
      "Your Rights",
      "You have the right to access, correct, or delete your personal information. You may also object to or restrict the processing of your personal information.",
      "Changes to This Policy",
      "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.",
    ],
    section8:[
      "The Case Rover platform and all content, materials, information, software, products, and services provided on the platform, are provided on an 'as is' and 'as available' basis. Your use of the platform is at your own risk. Case Rover expressly disclaims all warranties of any kind, whether express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. Case Rover makes no warranty that the platform will meet your requirements, or that the service will be uninterrupted, timely, secure, or error-free; nor does Case Rover make any warranty as to the results that may be obtained from the use of the platform or as to the accuracy or reliability of any information obtained through the platform.",
      "Case Rover does not guarantee the accuracy, completeness, or usefulness of any information on the platform and neither adopts nor endorses nor is responsible for the accuracy or reliability of any opinion, advice, or statement made. Under no circumstances will Case Rover be responsible for any loss or damage resulting from anyone's reliance on information or other content posted on the platform, or transmitted to participants.",
      "To the fullest extent permitted by applicable law, Case Rover shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses (even if Case Rover has been advised of the possibility of such damages), resulting from: (i) the use or the inability to use the platform; (ii) unauthorized access to or alteration of your transmissions or data; (iii) statements or conduct of any third party on the platform; or (iv) any other matter relating to the platform.",
    ],
    section9:[
      "You agree to indemnify, defend, and hold harmless Case Rover, its affiliates, officers, directors, employees, consultants, agents, and representatives from any and all third party claims, losses, liability, damages, and/or costs (including reasonable attorney fees and costs) arising from your access to or use of the platform, your violation of these Terms of Service, or your infringement, or infringement by any other user of your account, of any intellectual property or other right of any person or entity. Case Rover will notify you promptly of any such claim, loss, liability, or demand, and will provide you with reasonable assistance, at your expense, in defending any such claim, loss, liability, damage, or cost.",
      "Additionally, you agree to indemnify and hold Case Rover harmless from any claim or demand, including reasonable attorneys' fees, made by any third party due to or arising out of your use of the platform, your connection to the platform, your violation of the Terms and Conditions, or your violation of any rights of another. Your indemnification obligation will survive the termination of your use of the platform and your acceptance of these Terms and Conditions.",
    ],
    section10:[
      "Subscription and Payment",
      "Access to certain features and functionalities of the Case Rover platform may require a paid subscription. By subscribing to the platform, you agree to pay the subscription fees as set out on the platform at the time of your purchase. Your subscription will automatically renew at the end of each billing cycle unless you cancel it prior to the renewal date. You are responsible for providing accurate and up-to-date payment information and for the timely payment of all subscription fees. Failure to comply may result in the interruption or termination of your access to the platform services.",
      "Free Trial and Cancellation Policy",
      "Case Rover may offer a free trial period for new users to experience the platform's features without charge. Upon expiration of the free trial, you will be automatically enrolled in the paid subscription service, and applicable fees will apply, unless you cancel prior to the end of the trial period. You may cancel your subscription at any time; however, except as specifically provided in these terms, all fees are non-refundable. Cancellations will take effect at the end of the current billing cycle, and you will retain access to the platform until that time.",
      "Refund Policy",
      "Case Rover is committed to customer satisfaction and provides a refund policy under certain conditions. If you are not satisfied with the platform and have not used it extensively, you may request a refund within a specified period after your payment. Refund requests are subject to review and approval by Case Rover and may depend on the usage of the service and the reason for the request. Refunds are generally processed within a certain number of days and will be credited to the original method of payment.",
    ],
    section11:[
      "These Terms and Conditions and any separate agreements whereby Case Rover provides you services shall be governed by and construed in accordance with the laws of Zimbabwe, without regard to its conflict of law provisions. By accessing or using the Case Rover platform, you agree that the statutes and laws of Zimbabwe, without regard to the conflict of laws principles thereof, will apply to all matters relating to the use of the platform.",
      "In addition to the law of Zimbabwe, you may also be subject to other applicable local, national, or international laws when you use the Case Rover platform. It is your responsibility to ensure that your use of the platform complies with all applicable laws and regulations. In the case of any conflict between these Terms and Conditions and any national or international law, the latter shall prevail."
    ],
    section12:[
      "Feedback and Reporting Issues",
      "Case Rover values the input and feedback of its users as it strives to improve the platform's features and user experience. Users are encouraged to report any issues, bugs, or malfunctions they encounter, as well as provide suggestions and feedback for enhancements. Reports can be submitted through the platform's designated feedback channels. Case Rover is committed to addressing reported issues promptly and will endeavor to provide timely updates on the status of the resolution.",
      "Contact Information",
      "For any inquiries, support requests, or additional information regarding Case Rover, users can reach out through the platform's official contact channels. These may include an email address, telephone number, or a contact form available on the platform. Case Rover aims to provide a swift and helpful response to all user inquiries, ensuring that users have the support they need for an optimal experience on the platform.",
    ],
  };

  // Function to handle menu item selection
  const handleMenuClick = (e) => {
    setSelectedSection(e.key);
  };

  return (
    <>
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center'}}>
        <Button onClick={() => props.pageset('register')} icon={<ArrowLeftOutlined />} style={{ marginRight: '10px' }} />
        <div style={{ borderRight: '1px solid #ccc', paddingRight: '10px', marginRight: '10px' }} />
        <h3 style={{ margin: 0 }}>Terms And Conditions of Use</h3>
      </div>
      <Row>
        <Col span={5} style={{height:'80vh',overflow:'auto',position: 'sticky', top: 0,}}>
          <Menu
            mode="inline"
            selectedKeys={[selectedSection]}
            onClick={handleMenuClick}
            style={{ height: '100%' }}
          >
            {menuItems.map(item => (
              <Menu.Item key={item.key}>{item.title}</Menu.Item>
            ))}
          </Menu>
        </Col>
        <Col span={13} style={{paddingLeft:'20px',paddingRight:'20px'}}>
            {textData[selectedSection].map((item,index)=>(
              <Paragraph>{item}</Paragraph>
            ))}
        </Col>
      </Row>
    </>
  );
};

export default Terms;