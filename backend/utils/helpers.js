// CSV Export Utility
const json2csv = (data, fields) => {
  // Create header
  const header = fields.join(',') + '\n';
  
  // Create rows
  const rows = data.map(item => {
    return fields.map(field => {
      const value = item[field];
      // Handle special characters in CSV
      if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value || '';
    }).join(',');
  }).join('\n');

  return header + rows;
};

// Generate CSV file with proper formatting
const generateCSV = (data, filename = 'export.csv') => {
  const fields = Object.keys(data[0] || {});
  const csv = json2csv(data, fields);
  
  return {
    csv,
    filename,
  };
};

// Pagination helper
const getPaginationParams = (page = 1, limit = 10) => {
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.max(1, Math.min(100, parseInt(limit)));
  const skip = (pageNum - 1) * limitNum;

  return { pageNum, limitNum, skip };
};

// Response formatter
const successResponse = (res, statusCode, data, message = 'Success') => {
  res.status(statusCode).json({
    success: true,
    message,
    ...data,
  });
};

const errorResponse = (res, statusCode, message = 'Error', details = {}) => {
  res.status(statusCode).json({
    success: false,
    message,
    ...details,
  });
};

// Validation helpers
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // Min 6 chars, at least 1 letter and 1 number
  return password.length >= 6 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
};

const validateRollNumber = (rollNumber) => {
  // Allow alphanumeric with hyphens
  return /^[a-zA-Z0-9-]{2,20}$/.test(rollNumber);
};

module.exports = {
  generateCSV,
  json2csv,
  getPaginationParams,
  successResponse,
  errorResponse,
  validateEmail,
  validatePassword,
  validateRollNumber,
};
