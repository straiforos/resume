const renderHeader = require('../theme/partials/header');
const { JSDOM } = require('jsdom');

/**
 * @jest-environment jsdom
 */

describe('Header Rendering Tests', () => {
  
  test('should render header with name', () => {
    const basics = {
      name: 'John Doe',
      phone: '123-456-7890',
      email: 'john@example.com'
    };
    
    const result = renderHeader(basics);
    const dom = new JSDOM(result);
    const document = dom.window.document;
    
    expect(document.querySelector('.name')).toBeInTheDocument();
    expect(document.querySelector('.name')).toHaveTextContent('John Doe');
  });
  
  test('should render header with contact information', () => {
    const basics = {
      name: 'Jane Smith',
      phone: '(555) 123-4567',
      email: 'jane@example.com'
    };
    
    const result = renderHeader(basics);
    const dom = new JSDOM(result);
    const document = dom.window.document;
    
    expect(document.querySelector('.contact')).toBeInTheDocument();
    expect(document.querySelector('.contact')).toHaveTextContent('(555) 123-4567');
    expect(document.querySelector('.email')).toBeInTheDocument();
    expect(document.querySelector('.email')).toHaveTextContent('jane@example.com');
  });
  
  test('should render header with website link', () => {
    const basics = {
      name: 'Stephen G. Traiforos',
      phone: '(508) 494-5048',
      email: 'stephen@traiforos.com'
    };
    
    const result = renderHeader(basics);
    const dom = new JSDOM(result);
    const document = dom.window.document;
    
    const link = document.querySelector('a');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://stephen.traiforos.com/');
    expect(link).toHaveTextContent('{stephen.traiforos.com}');
  });
  
  test('should handle missing phone and email', () => {
    const basics = {
      name: 'Anonymous User'
    };
    
    const result = renderHeader(basics);
    const dom = new JSDOM(result);
    const document = dom.window.document;
    
    expect(document.querySelector('.name')).toBeInTheDocument();
    expect(document.querySelector('.name')).toHaveTextContent('Anonymous User');
    expect(document.querySelector('.contact-group')).toBeInTheDocument();
  });
  
  test('should escape HTML in contact information', () => {
    const basics = {
      name: 'Test & Special',
      phone: '<test>',
      email: 'test@example.com'
    };
    
    const result = renderHeader(basics);
    // Check that HTML is escaped in the raw HTML string
    expect(result).toContain('&amp;');
    expect(result).toContain('&lt;test&gt;');
    
    const dom = new JSDOM(result);
    const document = dom.window.document;
    
    // Should escape HTML
    const nameElement = document.querySelector('.name');
    expect(nameElement).toBeInTheDocument();
    expect(nameElement.textContent).toContain('Test');
    expect(nameElement.textContent).toContain('&');
  });
  
  test('should render all contact elements in correct structure', () => {
    const basics = {
      name: 'John Doe',
      phone: '123-456-7890',
      email: 'john@example.com'
    };
    
    const result = renderHeader(basics);
    const dom = new JSDOM(result);
    const document = dom.window.document;
    
    // Check for expected class names using Jest DOM
    expect(document.querySelector('.header')).toBeInTheDocument();
    expect(document.querySelector('.name')).toBeInTheDocument();
    expect(document.querySelector('.contact-group')).toBeInTheDocument();
    expect(document.querySelector('.json-link')).toBeInTheDocument();
    expect(document.querySelector('.contact')).toBeInTheDocument();
    expect(document.querySelector('.email')).toBeInTheDocument();
  });
  
  test('should handle special characters in name', () => {
    const basics = {
      name: 'José O\'Connor',
      phone: '123-456-7890',
      email: 'jose@example.com'
    };
    
    const result = renderHeader(basics);
    const dom = new JSDOM(result);
    const document = dom.window.document;
    
    const nameElement = document.querySelector('.name');
    expect(nameElement).toBeInTheDocument();
    expect(nameElement.textContent).toContain('José');
    expect(nameElement.textContent).toContain("O'Connor");
  });
  
});

