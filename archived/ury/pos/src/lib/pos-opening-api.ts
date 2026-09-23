import { call } from './frappe-sdk';

export interface POSOpeningResponse {
  message: number;
}

export interface POSCloseValidationResponse {
  message: string;
}

export const checkPOSOpening = async (): Promise<POSOpeningResponse> => {
  try {
    const response = await call.get<POSOpeningResponse>(
      'ury.ury_pos.api.posOpening'
    );
    
    return response;
  } catch (error) {
    console.error('Error checking POS opening status:', error);
    throw error;
  }
};

export const validatePOSClose = async (posProfile: string): Promise<POSCloseValidationResponse> => {
  try {
    const response = await call.get<POSCloseValidationResponse>(
      'ury.ury_pos.api.validate_pos_close',
      {
        pos_profile: posProfile
      }
    );
    
    return response;
  } catch (error) {
    console.error('Error validating POS close status:', error);
    throw error;
  }
}; 

export const createOpeningVoucher = async (posProfile: string, company: string, openingAmount: number): Promise<any> => {
  try {
    const balanceDetails = JSON.stringify([{
      mode_of_payment: "Cash",
      opening_amount: openingAmount
    }]);
    
    const response = await call.post(
      'erpnext.selling.page.point_of_sale.point_of_sale.create_opening_voucher',
      {
        pos_profile: posProfile,
        company: company,
        balance_details: balanceDetails
      }
    );
    return response;
  } catch (error) {
    console.error('Error creating POS opening entry:', error);
    throw error;
  }
};

export const getOpenShift = async (user: string): Promise<any> => {
  try {
    const response = await call.get(
      'erpnext.selling.page.point_of_sale.point_of_sale.check_opening_entry',
      { user }
    );
    return response;
  } catch (error) {
    console.error('Error getting open shift:', error);
    throw error;
  }
};

export const getClosingEntryDetails = async (openingEntryName: string): Promise<any> => {
  try {
    const response = await call.get('ury.ury_pos.api.get_closing_entry_details', {
      opening_entry_name: openingEntryName
    });
    
    return response;
  } catch (error) {
    console.error('Error getting closing entry details:', error);
    throw error;
  }
};

export const submitClosingEntry = async (closingEntryDoc: any): Promise<any> => {
  try {
    closingEntryDoc.docstatus = 1; // Submit
    const response = await call.post('frappe.client.save', {
      doc: closingEntryDoc
    });
    return response;
  } catch (error) {
    console.error('Error submitting closing entry:', error);
    throw error;
  }
}; 