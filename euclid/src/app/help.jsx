import React, { useState } from 'react';
import { Row, Col, Menu, Card, Button,Typography} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Text, Link,Paragraph, Title} = Typography;

const Help = (props) => {
  const [selectedSection, setSelectedSection] = useState('section1'); // State to track the selected section

  // Sample data for menu items and corresponding text
  const menuItems = [
    { key: 'section1', title: 'Getting Started' },
    { key: 'section2', title: 'Search Tips' },
    { key: 'section3', title: 'Using Filters' },
    { key: 'section4', title: 'Tools' },
    { key: 'section5', title: 'Documents' },
    { key: 'section6', title: 'Support and Resources' },
  ];

  const textData = {
    section1: [
      "Welcome to Case Rover, your premier AI-powered legal research assistant. To begin utilizing the full capabilities of our platform and access our intelligent chat interface, you will need to register for an account or log in if you are already a member.",
      "Registration Process",
      "If you are new to Case Rover, you can easily create an account by following these steps:",
      "a. Navigate to the Registration page.",
      "b. Fill in the required fields with your personal information, including your full name, email address, and preferred password.",
      "c. Read and agree to the Terms of Service and Privacy Policy.",
      "d. Submit your registration form.",
      "Login Instructions",
      "Returning users can access their accounts by following these simple steps:",
      "a. Click on the 'Login' option from the main menu.",
      "b. Enter your registered email address and password.",
      "c. Once authenticated, you will be directed to your personalized dashboard.",
      "Accessing the AI Chat Interface",
      "After logging in, you can immediately start using the AI-powered chat interface to conduct your legal research. The chat interface is designed to understand natural language queries, making it as simple as having a conversation with a legal expert. Just type your question, and let Case Rover provide you with accurate, relevant legal information and case law.",
      "We're excited to have you join the Case Rover community. If you encounter any issues during the registration or login process, please reach out to our support team for assistance.",
    ],
    section2: [
      "Search Tips for Optimal Results",
      "To harness the full potential of Case Rover's AI-powered search capabilities, it's important to structure your prompts effectively. The following tips will guide you in crafting search queries that yield the best results.",
      "Be Specific with Your Queries",
      "The more specific your search prompt, the more accurate your results will be. Include as much relevant information as possible, such as specific legal terms, relevant dates, jurisdictions, or case names.",
      "Use Natural Language",
      "Our AI is designed to understand natural language, so feel free to phrase your questions as if you were asking a colleague. For example, 'What are the recent rulings on copyright infringement in the Ninth Circuit?'",
      "Consider Synonyms and Related Terms",
      "Legal terminology can vary, so consider using synonyms or related terms to expand your search. For example, 'car accident' might also be referred to as 'traffic collision' or 'motor vehicle accident.'",
      "Phrase Your Questions Carefully",
      "The way you phrase your question can impact the results. Compare the results from 'What is the standard for negligence?' with 'How is negligence determined in personal injury cases?' to see different aspects of the issue.",
      "Review and Refine",
      "After conducting a search, review your results and refine your query as needed. This iterative process will help you get closer to the precise information you're seeking. By following these search tips, you'll be able to effectively communicate with our AI and enhance your legal research experience. If you need additional assistance, our support team is always here to help.",
    ],
    section3: [
      "Filters are a powerful feature of Case Rover that allow you to narrow down your search results to the most pertinent cases and legal documents. By using filters, you can focus on the information that is most relevant to your legal query.",
      "By mastering the use of filters, you'll enhance your ability to conduct efficient and targeted legal research on Case Rover. If you have any questions about using filters or need further assistance, our support team is ready to help.",
    ],
    section4: [
      "Select the best tools you want use.",
    ],
    section5: [
      "Upload documents and chat with them.",
    ],
    section6: [
      "At Case Rover, we are committed to providing our users with comprehensive support and a wealth of resources to ensure an optimal experience on our platform. Whether you're facing technical issues, have questions about legal research, or need guidance on using our features, we're here to help.",
      "User Guides",
      "Our detailed user guides offer step-by-step instructions on everything from getting started to utilizing advanced features. They are designed to help you navigate the platform with ease and make the most of Case Rover's capabilities.",
      "Frequently Asked Questions (FAQs)",
      "The FAQs section addresses common queries and provides quick answers to typical issues that users may encounter. This is a great starting point for resolving general questions about Case Rover.",
      "Contact Support",
      "If you require personalized assistance, our dedicated support team is available to help. You can reach out via email, phone, or live chat during our business hours for prompt and professional support.",
      "Feedback and Suggestions",
      "Your feedback is important to us. If you have suggestions for new features or improvements, please let us know. We continuously work to enhance Case Rover based on user input. We are dedicated to ensuring that you have all the support and resources you need for a seamless and productive experience with Case Rover. Don't hesitate to reach out with any questions or for additional support.",
    ],
  };

  // Function to handle menu item selection
  const handleMenuClick = (e) => {
    setSelectedSection(e.key);
  };

  return (
    <>
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center' }}>
        <Button onClick={() => props.screenset('core', props.user_id)} icon={<ArrowLeftOutlined />} style={{ marginRight: '10px' }} />
        <div style={{ borderRight: '1px solid #ccc', paddingRight: '10px', marginRight: '10px' }} />
        <h3 style={{ margin: 0 }}>Help</h3>
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

export default Help;