/**
 * XSS (Cross-Site Scripting) attacks occur when an attacker manages to inject malicious 
 * JavaScript code into the content of a website, which is then executed by another person's browser.
 * One of the main defenses against XSS attacks is to ensure that any data coming from users 
 * (or other untrusted sources) is properly sanitized before being displayed on the site.
 * 
 * Below I show you a basic example of how to sanitize user input in a Next.js application using the dompurify library.
 * 
 * Explanation:
 * - dompurify is a library that allows you to sanitize HTML strings to prevent XSS attacks.
 * - jsdom is a JavaScript implementation of the web standard. Since dompurify needs access 
 *   to the DOM API to work and we are not in a browser, we use jsdom to provide a mock DOM environment.
 * - We create an instance of dompurify with the DOM environment provided by jsdom.
 * - The sanitizeHTML function receives an HTML string and returns a sanitized version of it.
 */


import dompurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const dompurifyInstance = dompurify(window);

export function sanitizeHTML(html: string): string {
    return dompurifyInstance.sanitize(html);
}