// Mock data for components

// Mock data for InputField component
export const mockInputProps = {
  label: "Email Address",
  placeholder: "Enter your email",
  helperText: "We'll never share your email with anyone else",
  errorMessage: "Please enter a valid email address",
  value: "user@example.com"
};

// Comprehensive dummy data for all input field states
export const dummyInputData = {
  // Basic variants with realistic data
  outlined: {
    value: "John Doe",
    placeholder: "Enter your full name"
  },
  filled: {
    value: "Software Engineer",
    placeholder: "Enter your job title"
  },
  ghost: {
    value: "New York, NY",
    placeholder: "Enter your location"
  },
  
  // Size variants with appropriate content
  small: {
    value: "USD",
    placeholder: "Currency code"
  },
  large: {
    value: "Welcome to our amazing platform! We're excited to have you here.",
    placeholder: "Enter a detailed description"
  },
  
  // State-specific data
  email: {
    valid: "sarah.johnson@company.com",
    invalid: "invalid.email@",
    placeholder: "your.email@example.com"
  },
  password: {
    value: "MySecureP@ssw0rd123!",
    placeholder: "Enter a strong password (8+ characters)"
  },
  error: {
    value: "admin@",
    errorMessage: "Please enter a valid email address with domain"
  },
  disabled: {
    value: "This content cannot be modified",
    placeholder: "Read-only field"
  },
  
  // Form field examples
  firstName: "Alexander",
  lastName: "Thompson",
  company: "TechCorp Solutions Inc.",
  phone: "+1 (555) 123-4567",
  website: "https://www.example-company.com",
  address: "123 Main Street, Suite 456",
  city: "San Francisco",
  zipCode: "94105",
  country: "United States",
  
  // Additional realistic examples
  username: "alex_thompson_2024",
  bio: "Passionate software developer with 5+ years of experience in React, TypeScript, and Node.js. Love building user-friendly applications.",
  skills: "React, TypeScript, Node.js, Python, AWS",
  experience: "Senior Full Stack Developer at TechCorp (2020-Present)",
  education: "Bachelor of Science in Computer Science - Stanford University",
  
  // Error messages for different scenarios
  errorMessages: {
    required: "This field is required",
    email: "Please enter a valid email address",
    password: "Password must be at least 8 characters long",
    phone: "Please enter a valid phone number",
    url: "Please enter a valid URL",
    minLength: "Must be at least 3 characters long",
    maxLength: "Cannot exceed 100 characters",
    alphanumeric: "Only letters and numbers are allowed",
    specialChars: "Special characters are not allowed"
  },
  
  // Helper texts for guidance
  helperTexts: {
    email: "We'll use this to send you important updates",
    password: "Use a mix of letters, numbers, and symbols",
    phone: "Include country code for international numbers",
    website: "Include http:// or https://",
    bio: "Tell us about yourself in a few sentences",
    skills: "Separate skills with commas",
    optional: "This field is optional"
  }
};

// Mock data for DataTable component
export const mockTableData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Editor", status: "Active" },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "User", status: "Pending" }
];

export const mockTableColumns = [
  { key: "name", title: "Name", dataIndex: "name" as const, sortable: true },
  { key: "email", title: "Email", dataIndex: "email" as const, sortable: true },
  { key: "role", title: "Role", dataIndex: "role" as const, sortable: false },
  { key: "status", title: "Status", dataIndex: "status" as const, sortable: true }
];

// ... existing code ...