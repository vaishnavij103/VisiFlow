'use server';
/**
 * @fileOverview An AI assistant flow for extracting identity information from images of IDs or business cards.
 *
 * - extractIdentityInformation - A function that handles the identity extraction process.
 * - IdentityExtractionInput - The input type for the extractIdentityInformation function.
 * - IdentityExtractionOutput - The return type for the extractIdentityInformation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentityExtractionInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A photo of an identification document or business card, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  documentType: z
    .enum(['id', 'business_card', 'unknown'])
    .default('unknown')
    .optional()
    .describe('The type of document being processed. This can help guide the extraction.'),
});
export type IdentityExtractionInput = z.infer<typeof IdentityExtractionInputSchema>;

const IdentityExtractionOutputSchema = z.object({
  firstName: z.string().optional().describe('The extracted first name.'),
  lastName: z.string().optional().describe('The extracted last name.'),
  mobileNumber: z.string().optional().describe('The extracted mobile number.'),
  email: z.string().optional().describe('The extracted email address.'),
  companyName: z.string().optional().describe('The extracted company name.'),
  rawTextContent: z.string().optional().describe('All raw text content extracted from the image for potential further processing.'),
});
export type IdentityExtractionOutput = z.infer<typeof IdentityExtractionOutputSchema>;

export async function extractIdentityInformation(input: IdentityExtractionInput): Promise<IdentityExtractionOutput> {
  return identityExtractionFlow(input);
}

const extractIdentityPrompt = ai.definePrompt({
  name: 'extractIdentityPrompt',
  input: {schema: IdentityExtractionInputSchema},
  output: {schema: IdentityExtractionOutputSchema},
  model: 'googleai/gemini-1.5-flash-latest', // Using a vision-capable model for image processing
  prompt: `You are an expert AI assistant designed to extract personal and contact information from images of identification documents or business cards.\n\nAnalyze the provided image of a document ({{documentType}}) and extract the following details if they are clearly visible and legible:\n- First Name\n- Last Name\n- Mobile Number\n- Email Address\n- Company Name\n\nAdditionally, extract all raw text content from the image.\n\nFormat your response as a JSON object with the following keys. If a piece of information is not found, the corresponding key should be omitted or set to null.\n\n{\n  "firstName": "string | null",\n  "lastName": "string | null",\n  "mobileNumber": "string | null",\n  "email": "string | null",\n  "companyName": "string | null",\n  "rawTextContent": "string | null"\n}\n\nImage: {{media url=imageDataUri}}`,
});

const identityExtractionFlow = ai.defineFlow(
  {
    name: 'identityExtractionFlow',
    inputSchema: IdentityExtractionInputSchema,
    outputSchema: IdentityExtractionOutputSchema,
  },
  async input => {
    const {output} = await extractIdentityPrompt(input);
    return output!;
  }
);
