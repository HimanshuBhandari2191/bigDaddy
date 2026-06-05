import React from 'react'
import { Link } from 'react-router-dom'

const Disclaimer = () => {
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    color: '#a1a1aa',
    lineHeight: '1.8',
    minHeight: '80vh'
  }

  const sectionStyle = {
    marginBottom: '40px'
  }

  const headingStyle = {
    color: '#f97316',
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '15px',
    marginTop: '30px'
  }

  const subHeadingStyle = {
    color: '#f97316',
    fontSize: '1.1rem',
    fontWeight: '600',
    marginTop: '20px',
    marginBottom: '10px'
  }

  const paragraphStyle = {
    marginBottom: '15px',
    fontSize: '0.95rem'
  }

  const listStyle = {
    marginLeft: '20px',
    marginBottom: '15px'
  }

  const listItemStyle = {
    marginBottom: '8px'
  }

  return (
    <div style={{ background: '#09090b', minHeight: '100vh', paddingTop: '20px', paddingBottom: '40px' }}>
      <div style={containerStyle}>
        <h1 style={{ color: '#f97316', fontSize: '2.5rem', marginBottom: '10px' }}>Disclaimer</h1>
        <p style={{ color: '#6b6b7a', marginBottom: '40px', fontSize: '0.9rem' }}>Last Updated: June 2026</p>

        {/* General Disclaimer */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>1. General Disclaimer</h2>
          <p style={paragraphStyle}>
            Big Daddy Tattoos ("the Website," "we," "our," or "us") provides this e-commerce platform "as is" and "as available" 
            without warranties of any kind. The information, products, and services displayed on our website are provided 
            for informational and commercial purposes only.
          </p>
          <p style={paragraphStyle}>
            While we strive to ensure that all information on Big Daddy Tattoos is accurate, current, and reliable, we make no 
            representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, 
            suitability, or availability of the website or any of its contents.
          </p>
        </div>

        {/* Product Information */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>2. Product Information</h2>
          <h3 style={subHeadingStyle}>2.1 Product Descriptions</h3>
          <p style={paragraphStyle}>
            We attempt to provide accurate product descriptions, images, and pricing. However, we do not warrant that 
            product descriptions, pricing, availability, or other content on our website is accurate, complete, reliable, 
            current, or error-free. If a product offered on Big Daddy Tattoos is not as described, your sole remedy is to return it 
            in unused condition.
          </p>

          <h3 style={subHeadingStyle}>2.2 Product Images</h3>
          <p style={paragraphStyle}>
            Product images are for illustration purposes only. Actual product appearance may vary due to lighting, 
            camera angles, screen resolution, and other factors. Colors and sizes may differ slightly from what is 
            displayed on the website.
          </p>

          <h3 style={subHeadingStyle}>2.3 Pricing</h3>
          <p style={paragraphStyle}>
            We reserve the right to change prices at any time without notice. We are not responsible for any price changes, 
            errors, or omissions. If a product is listed at an incorrect price due to a typographical error or system malfunction, 
            we reserve the right to refuse or cancel the order.
          </p>
        </div>

        {/* Limitation of Liability */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>3. Limitation of Liability</h2>
          <p style={paragraphStyle}>
            To the fullest extent permitted by applicable law, Big Daddy Tattoos, its owners, operators, and service providers shall 
            not be liable for any indirect, incidental, special, consequential, punitive, or exemplary damages, including but 
            not limited to:
          </p>
          <ul style={listStyle}>
            <li style={listItemStyle}>Loss of profits or revenue</li>
            <li style={listItemStyle}>Loss of data or information</li>
            <li style={listItemStyle}>Loss of business opportunities</li>
            <li style={listItemStyle}>Interruption of service or business</li>
            <li style={listItemStyle}>Damage to your computer or devices</li>
          </ul>
          <p style={paragraphStyle}>
            This applies even if Big Daddy Tattoos has been advised of the possibility of such damages.
          </p>
        </div>

        {/* Third-Party Links */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>4. Third-Party Links and Content</h2>
          <p style={paragraphStyle}>
            Big Daddy Tattoos may contain links to third-party websites, services, and content. We do not endorse, approve, or assume 
            responsibility for any third-party sites, information, materials, products, or services. Your use of third-party 
            websites is at your own risk and subject to their terms and conditions.
          </p>
          <p style={paragraphStyle}>
            We are not responsible for any damages or losses resulting from your access to or use of third-party content or services.
          </p>
        </div>

        {/* User Responsibilities */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>5. User Responsibilities</h2>
          <p style={paragraphStyle}>
            By using Big Daddy Tattoos, you agree that you:
          </p>
          <ul style={listStyle}>
            <li style={listItemStyle}>Will provide accurate and complete information</li>
            <li style={listItemStyle}>Will not violate any applicable laws or regulations</li>
            <li style={listItemStyle}>Will not engage in fraudulent or illegal activities</li>
            <li style={listItemStyle}>Will not interfere with or disrupt the website or servers</li>
            <li style={listItemStyle}>Will respect intellectual property rights</li>
          </ul>
        </div>

        {/* Intellectual Property */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>6. Intellectual Property Rights</h2>
          <p style={paragraphStyle}>
            All content on Big Daddy Tattoos, including text, graphics, logos, images, and software, is the property of Big Daddy Tattoos 
            or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, 
            transmit, display, or perform any content without prior written permission from Big Daddy Tattoos.
          </p>
        </div>

        {/* Limitation of Warranties */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>7. Limitation of Warranties</h2>
          <p style={paragraphStyle}>
            EXCEPT AS EXPRESSLY PROVIDED IN OUR RETURN POLICY, BIG DADDY TATTOOS MAKES NO OTHER WARRANTIES, EXPRESS OR IMPLIED, 
            INCLUDING BUT NOT LIMITED TO:
          </p>
          <ul style={listStyle}>
            <li style={listItemStyle}>Implied warranties of merchantability or fitness for a particular purpose</li>
            <li style={listItemStyle}>Warranties regarding uninterrupted, error-free, or secure service</li>
            <li style={listItemStyle}>Warranties that defects will be corrected</li>
          </ul>
        </div>

        {/* Health and Safety Disclaimer */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>8. Health and Safety Information</h2>
          <p style={paragraphStyle}>
            Any health, wellness, or nutritional information provided on Big Daddy Tattoos is for general informational purposes only 
            and should not be considered medical advice. Always consult with a qualified healthcare professional before making 
            any health-related decisions or consuming any health-related products.
          </p>
          <p style={paragraphStyle}>
            Big Daddy Tattoos is not responsible for any adverse effects resulting from the use of products purchased on our platform.
          </p>
        </div>

        {/* Modification of Terms */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>9. Modification of Disclaimer</h2>
          <p style={paragraphStyle}>
            Big Daddy Tattoos reserves the right to modify this disclaimer at any time without notice. Changes are effective immediately 
            upon posting to the website. Your continued use of Big Daddy Tattoos following any modifications constitutes your acceptance 
            of the updated disclaimer.
          </p>
        </div>

        {/* Contact Information */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>10. Contact Us</h2>
          <p style={paragraphStyle}>
            If you have questions about this disclaimer or our practices, please contact us at:
          </p>
          <ul style={listStyle}>
            <li style={listItemStyle}>Email: bigDaddy@gmail.com</li>
            <li style={listItemStyle}>Phone: 1-800-BIGDADDY</li>
            <li style={listItemStyle}>Mailing Address: Big Daddy Tattoos Customer Support, 123 Commerce Street, Commerce City, CC 12345</li>
          </ul>
        </div>

        {/* Footer Navigation */}
        <div style={{ marginTop: '50px', paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ marginBottom: '20px' }}>
            <Link to="/" style={{ color: '#f97316', textDecoration: 'none', fontWeight: '600' }}>
              ← Back to Home
            </Link>
          </p>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <Link to="/about" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: '0.9rem' }}>About Us</Link>
            <Link to="/return" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: '0.9rem' }}>Return Policy</Link>
            <Link to="/disclaimer" style={{ color: '#f97316', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600' }}>Disclaimer</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Disclaimer
