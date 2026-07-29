import React from 'react'
import { Link } from 'react-router-dom'

const ReturnPolicy = () => {
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    color: '#a3a3a3',
    lineHeight: '1.8',
    minHeight: '80vh'
  }

  const sectionStyle = {
    marginBottom: '40px'
  }

  const headingStyle = {
    color: '#e5e5e5',
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '15px',
    marginTop: '30px'
  }

  const subHeadingStyle = {
    color: '#e5e5e5',
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

  const boxStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px'
  }

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px'
  }

  const thStyle = {
    background: 'rgba(255, 255, 255, 0.2)',
    color: '#e5e5e5',
    padding: '12px',
    textAlign: 'left',
    fontWeight: '600',
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)'
  }

  const tdStyle = {
    padding: '12px',
    borderBottom: '1px solid rgba(255,255,255,0.05)'
  }

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: '20px', paddingBottom: '40px' }}>
      <div style={containerStyle}>
        <h1 style={{ color: '#e5e5e5', fontSize: '2.5rem', marginBottom: '10px' }}>Return Policy</h1>
        <p style={{ color: '#8a8a8a', marginBottom: '40px', fontSize: '0.9rem' }}>Last Updated: January 2025</p>

        {/* Quick Summary */}
        <div style={boxStyle}>
          <h2 style={{ color: '#e5e5e5', fontSize: '1.1rem', marginTop: 0 }}>Quick Summary</h2>
          <p style={{ marginBottom: '10px' }}>
            We offer a <strong style={{ color: '#e5e5e5' }}>30-day return window</strong> for most items in their original condition. 
            Most returns are processed within 5-7 business days after we receive them.
          </p>
          <p>
            <strong style={{ color: '#e5e5e5' }}>Return shipping:</strong> Free for defective items; paid by customer otherwise 
            (unless the return is due to our error or a damaged/defective product).
          </p>
        </div>

        {/* Return Window */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>1. Return Window</h2>
          <p style={paragraphStyle}>
            You have <strong style={{ color: '#e5e5e5' }}>30 calendar days</strong> from the date of purchase to return eligible items 
            to Big Daddy Tattoos. The return window begins on the date your order is delivered, not the purchase date.
          </p>
          <p style={paragraphStyle}>
            For items purchased during promotional periods or sales, the same 30-day return policy applies.
          </p>
        </div>

        {/* Eligible Items */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>2. Eligible Items for Return</h2>
          <p style={paragraphStyle}>
            Items are eligible for return if they meet the following conditions:
          </p>
          <ul style={listStyle}>
            <li style={listItemStyle}>Unused and in original condition</li>
            <li style={listItemStyle}>In original packaging with all tags attached</li>
            <li style={listItemStyle}>Include all original accessories and documentation</li>
            <li style={listItemStyle}>Not damaged due to misuse or accidents</li>
            <li style={listItemStyle}>Within the 30-day return window</li>
            <li style={listItemStyle}>Purchased from Big Daddy Tattoos directly</li>
          </ul>
        </div>

        {/* Non-Returnable Items */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>3. Non-Returnable Items</h2>
          <p style={paragraphStyle}>
            The following items cannot be returned:
          </p>
          <ul style={listStyle}>
            <li style={listItemStyle}>Clearance items marked as final sale</li>
            <li style={listItemStyle}>Items purchased from third-party sellers (unless otherwise specified)</li>
            <li style={listItemStyle}>Custom or personalized items</li>
            <li style={listItemStyle}>Items showing signs of wear or damage</li>
            <li style={listItemStyle}>Undergarments, swimwear, or intimate items that have been worn</li>
            <li style={listItemStyle}>Items without original tags or packaging</li>
            <li style={listItemStyle}>Perishable or consumable products</li>
            <li style={listItemStyle}>Digital products or downloads</li>
            <li style={listItemStyle}>Items damaged by customer negligence</li>
          </ul>
        </div>

        {/* How to Return */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>4. How to Return Items</h2>
          <p style={paragraphStyle}>
            Follow these simple steps to initiate a return:
          </p>
          
          <h3 style={subHeadingStyle}>Step 1: Initiate Return Request</h3>
          <ul style={listStyle}>
            <li style={listItemStyle}>Log in to your Big Daddy Tattoos account</li>
            <li style={listItemStyle}>Navigate to "My Orders"</li>
            <li style={listItemStyle}>Select the item you wish to return</li>
            <li style={listItemStyle}>Click "Request Return" and provide a reason</li>
          </ul>

          <h3 style={subHeadingStyle}>Step 2: Receive Return Authorization</h3>
          <ul style={listStyle}>
            <li style={listItemStyle}>You will receive a Return Merchandise Authorization (RMA) number via email</li>
            <li style={listItemStyle}>Print or note your RMA number</li>
            <li style={listItemStyle}>Include the RMA number in your package</li>
          </ul>

          <h3 style={subHeadingStyle}>Step 3: Ship the Item</h3>
          <ul style={listStyle}>
            <li style={listItemStyle}>Pack the item securely in original packaging</li>
            <li style={listItemStyle}>Include the RMA number on the outside of the package</li>
            <li style={listItemStyle}>Ship to the return address provided in your email</li>
            <li style={listItemStyle}>We recommend using a tracked shipping method</li>
          </ul>

          <h3 style={subHeadingStyle}>Step 4: Return Processed</h3>
          <ul style={listStyle}>
            <li style={listItemStyle}>Once received and inspected, your refund will be processed</li>
            <li style={listItemStyle}>You will receive a confirmation email</li>
            <li style={listItemStyle}>Refunds typically appear within 5-7 business days</li>
          </ul>
        </div>

        {/* Shipping Information */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>5. Return Shipping & Costs</h2>
          
          <h3 style={subHeadingStyle}>Free Return Shipping</h3>
          <p style={paragraphStyle}>
            Big Daddy Tattoos will cover return shipping costs for:
          </p>
          <ul style={listStyle}>
            <li style={listItemStyle}>Defective or damaged items</li>
            <li style={listItemStyle}>Items that don't match the product description</li>
            <li style={listItemStyle}>Orders with incorrect items</li>
            <li style={listItemStyle}>Items received different from what was ordered</li>
          </ul>

          <h3 style={subHeadingStyle}>Paid Return Shipping</h3>
          <p style={paragraphStyle}>
            Customer is responsible for return shipping costs for:
          </p>
          <ul style={listStyle}>
            <li style={listItemStyle}>Returns due to change of mind</li>
            <li style={listItemStyle}>Items simply not as expected (when description was accurate)</li>
            <li style={listItemStyle}>General returns outside of damage or error</li>
          </ul>
        </div>

        {/* Refund Policy */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>6. Refund Processing</h2>
          
          <h3 style={subHeadingStyle}>Refund Timeline</h3>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Stage</th>
                <th style={thStyle}>Timeline</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}>Item received & inspection begins</td>
                <td style={tdStyle}>Same day or next business day</td>
              </tr>
              <tr>
                <td style={tdStyle}>Quality inspection completed</td>
                <td style={tdStyle}>2-3 business days</td>
              </tr>
              <tr>
                <td style={tdStyle}>Refund approved & processed</td>
                <td style={tdStyle}>1 business day</td>
              </tr>
              <tr>
                <td style={tdStyle}>Refund appears in account</td>
                <td style={tdStyle}>3-5 business days (bank dependent)</td>
              </tr>
            </tbody>
          </table>

          <h3 style={subHeadingStyle}>Refund Amount</h3>
          <ul style={listStyle}>
            <li style={listItemStyle}>Full product price refund for eligible returns</li>
            <li style={listItemStyle}>Original shipping costs refunded for defective items</li>
            <li style={listItemStyle}>Original shipping non-refundable for change-of-mind returns</li>
            <li style={listItemStyle}>Return shipping costs deducted (unless covered by Big Daddy Tattoos)</li>
            <li style={listItemStyle}>Promotional discounts refunded at the discounted price</li>
          </ul>

          <h3 style={subHeadingStyle}>Refund Methods</h3>
          <ul style={listStyle}>
            <li style={listItemStyle}>Original payment method: Primary refund method</li>
            <li style={listItemStyle}>Big Daddy Tattoos credit: Available as alternative</li>
            <li style={listItemStyle}>Store credit: Can be issued if requested</li>
          </ul>
        </div>

        {/* Damaged & Defective Items */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>7. Damaged or Defective Items</h2>
          <p style={paragraphStyle}>
            If you receive a damaged or defective item:
          </p>
          <ul style={listStyle}>
            <li style={listItemStyle}>Contact customer support within 48 hours of receipt</li>
            <li style={listItemStyle}>Provide photos of the damage or defect</li>
            <li style={listItemStyle}>Do not open or further damage the package</li>
            <li style={listItemStyle}>We will provide a prepaid return label (usually overnight shipping)</li>
            <li style={listItemStyle}>Item will be replaced or refunded immediately upon return</li>
          </ul>
          <p style={paragraphStyle}>
            For damaged shipments, we may also arrange a replacement to be sent before the return is processed.
          </p>
        </div>

        {/* Exceptions */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>8. Return Policy Exceptions</h2>
          <p style={paragraphStyle}>
            The following situations have modified return policies:
          </p>
          
          <h3 style={subHeadingStyle}>Sale & Clearance Items</h3>
          <ul style={listStyle}>
            <li style={listItemStyle}>Final sale items: Non-returnable</li>
            <li style={listItemStyle}>Clearance items: 15-day return window instead of 30</li>
            <li style={listItemStyle}>Flash sale items: 7-day return window</li>
          </ul>

          <h3 style={subHeadingStyle}>Seasonal Items</h3>
          <ul style={listStyle}>
            <li style={listItemStyle}>Holiday items must be returned within 15 days of purchase</li>
            <li style={listItemStyle}>Seasonal products have a 20-day return window</li>
          </ul>

          <h3 style={subHeadingStyle}>International Orders</h3>
          <ul style={listStyle}>
            <li style={listItemStyle}>Returns subject to applicable customs regulations</li>
            <li style={listItemStyle}>Customer responsible for international return shipping</li>
            <li style={listItemStyle}>15-day return window for international orders</li>
          </ul>
        </div>

        {/* Exchanges */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>9. Exchanges</h2>
          <p style={paragraphStyle}>
            Want a different size, color, or style instead of a refund?
          </p>
          <ul style={listStyle}>
            <li style={listItemStyle}>Request an exchange within 30 days of purchase</li>
            <li style={listItemStyle}>We'll send the new item before receiving the old one (for in-stock items)</li>
            <li style={listItemStyle}>Return the original item within 30 days</li>
            <li style={listItemStyle}>No additional shipping charges for defective items</li>
            <li style={listItemStyle}>$5 exchange fee may apply for size/color changes</li>
          </ul>
        </div>

        {/* Contact & Support */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>10. Questions About Our Return Policy?</h2>
          <p style={paragraphStyle}>
            We're here to help! Contact our customer support team:
          </p>
          <ul style={listStyle}>
            <li style={listItemStyle}>📧 Email: support@Big Daddy Tattoos.com</li>
            <li style={listItemStyle}>📞 Phone: 1-800-Big Daddy Tattoos (Monday-Friday, 9AM-6PM EST)</li>
            <li style={listItemStyle}>💬 Live Chat: Available on our website</li>
            <li style={listItemStyle}>📍 Address: Big Daddy Tattoos Customer Support, 123 Commerce Street, Commerce City, CC 12345</li>
          </ul>
        </div>

        {/* Footer Navigation */}
        <div style={{ marginTop: '50px', paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ marginBottom: '20px' }}>
            <Link to="/" style={{ color: '#e5e5e5', textDecoration: 'none', fontWeight: '600' }}>
              ← Back to Home
            </Link>
          </p>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <Link to="/about" style={{ color: '#a3a3a3', textDecoration: 'none', fontSize: '0.9rem' }}>About Us</Link>
            <Link to="/return" style={{ color: '#e5e5e5', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600' }}>Return Policy</Link>
            <Link to="/disclaimer" style={{ color: '#a3a3a3', textDecoration: 'none', fontSize: '0.9rem' }}>Disclaimer</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReturnPolicy
