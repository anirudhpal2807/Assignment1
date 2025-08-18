import React, { useState, useCallback, useMemo } from 'react';
import { InputField } from './components/InputField/InputField';
import { DataTable } from './components/DataTable/DataTable';
import { Button } from './components/ui/Button';
import { mockTableData, mockTableColumns, dummyInputData } from './data/componentLibraryMockData';
import { useInputValidation } from './hooks/useInputValidation';
import { useDebouncedCallback } from './hooks/useDebounce';

function App() {
  const [inputValues, setInputValues] = useState({
    basic: dummyInputData.outlined.value,
    filled: dummyInputData.filled.value,
    ghost: dummyInputData.ghost.value,
    small: dummyInputData.small.value,
    large: dummyInputData.large.value,
    email: dummyInputData.email.valid,
    password: dummyInputData.password.value,
    withError: dummyInputData.error.value,
    disabled: dummyInputData.disabled.value,
    firstName: dummyInputData.firstName,
    lastName: dummyInputData.lastName,
    company: dummyInputData.company,
    phone: dummyInputData.phone,
    website: dummyInputData.website
  });

  const [fieldStates, setFieldStates] = useState({
    showEmailError: true,
    showPasswordHelper: true,
    isDisabled: true
  });

  const [tableLoading, setTableLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const { validateField } = useInputValidation();

  const handleInputChange = useCallback((field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Clear error state when user starts typing
    if (field === 'withError' && fieldStates.showEmailError) {
      setFieldStates(prev => ({ ...prev, showEmailError: false }));
    }
  }, [fieldStates.showEmailError]);

  const debouncedRowSelect = useDebouncedCallback((rows: any[]) => {
    setSelectedRows(rows);
  }, 200);

  const handleRowSelect = useCallback((rows: any[]) => {
    debouncedRowSelect(rows);
  }, [debouncedRowSelect]);

  const toggleLoading = useCallback(async () => {
    setButtonLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setTableLoading(prev => !prev);
    setButtonLoading(false);
  }, []);

  const clearAllInputs = useCallback(() => {
    setInputValues({
      basic: '',
      filled: '',
      ghost: '',
      small: '',
      large: '',
      email: '',
      password: '',
      withError: '',
      disabled: dummyInputData.disabled.value, // Keep disabled value
      firstName: '',
      lastName: '',
      company: '',
      phone: '',
      website: ''
    });
  }, []);

  const fillAllInputs = useCallback(() => {
    setInputValues({
      basic: dummyInputData.outlined.value,
      filled: dummyInputData.filled.value,
      ghost: dummyInputData.ghost.value,
      small: dummyInputData.small.value,
      large: dummyInputData.large.value,
      email: dummyInputData.email.valid,
      password: dummyInputData.password.value,
      withError: dummyInputData.email.valid, // Use valid email to clear error
      disabled: dummyInputData.disabled.value,
      firstName: dummyInputData.firstName,
      lastName: dummyInputData.lastName,
      company: dummyInputData.company,
      phone: dummyInputData.phone,
      website: dummyInputData.website
    });
    setFieldStates(prev => ({ ...prev, showEmailError: false }));
  }, []);

  const toggleStates = useCallback(() => {
    setFieldStates(prev => ({
      showEmailError: !prev.showEmailError,
      showPasswordHelper: !prev.showPasswordHelper,
      isDisabled: !prev.isDisabled
    }));
  }, []);

  // Memoize validation results
  const emailValidation = useMemo(() => {
    if (inputValues.email && fieldStates.showEmailError) {
      const error = validateField('email', inputValues.email, 'email');
      return error;
    }
    return '';
  }, [inputValues.email, validateField, fieldStates.showEmailError]);

  const errorValidation = useMemo(() => {
    if (fieldStates.showEmailError) {
      return dummyInputData.errorMessages.email;
    }
    return '';
  }, [fieldStates.showEmailError]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Component Library</h1>
          <p className="text-lg text-gray-600">React components with TypeScript and modern patterns</p>
          
          {/* Quick Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={clearAllInputs} variant="secondary" size="sm">
              Clear All Inputs
            </Button>
            <Button onClick={fillAllInputs} variant="primary" size="sm">
              Fill All Inputs
            </Button>
            <Button onClick={toggleStates} variant="ghost" size="sm">
              Toggle States
            </Button>
            <Button 
              onClick={toggleLoading} 
              loading={buttonLoading}
              size="sm"
            >
              {tableLoading ? 'Hide Loading' : 'Show Loading'}
            </Button>
          </div>
        </div>

        {/* InputField Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">InputField Component</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic Variants */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-700">Variants & Sizes</h3>
              
              <div className="space-y-4">
                <InputField
                  label="Outlined (Default)"
                  placeholder={dummyInputData.outlined.placeholder}
                  value={inputValues.basic}
                  onChange={handleInputChange('basic')}
                  variant="outlined"
                  size="md"
                  helperText="This input updates in real-time"
                />

                <InputField
                  label="Filled Variant"
                  placeholder={dummyInputData.filled.placeholder}
                  value={inputValues.filled}
                  onChange={handleInputChange('filled')}
                  variant="filled"
                  size="md"
                  helperText="Filled background style"
                />

                <InputField
                  label="Ghost Variant"
                  placeholder={dummyInputData.ghost.placeholder}
                  value={inputValues.ghost}
                  onChange={handleInputChange('ghost')}
                  variant="ghost"
                  size="md"
                  helperText="Minimal transparent style"
                />

                <InputField
                  label="Small Size"
                  placeholder={dummyInputData.small.placeholder}
                  value={inputValues.small}
                  onChange={handleInputChange('small')}
                  variant="outlined"
                  size="sm"
                  helperText="Compact size for tight spaces"
                />

                <InputField
                  label="Large Size"
                  placeholder={dummyInputData.large.placeholder}
                  value={inputValues.large}
                  onChange={handleInputChange('large')}
                  variant="outlined"
                  size="lg"
                  helperText="Spacious size for emphasis"
                />
              </div>
            </div>

            {/* States & Features */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-700">States & Features</h3>
              
              <div className="space-y-4">
                <InputField
                  label="Email with Validation"
                  type="email"
                  value={inputValues.email}
                  onChange={handleInputChange('email')}
                  placeholder={dummyInputData.email.placeholder}
                  showClearButton={true}
                  invalid={!!emailValidation}
                  errorMessage={emailValidation}
                  helperText={!emailValidation ? dummyInputData.helperTexts.email : ''}
                />

                <InputField
                  label="Password with Toggle"
                  type="password"
                  value={inputValues.password}
                  onChange={handleInputChange('password')}
                  placeholder={dummyInputData.password.placeholder}
                  showPasswordToggle={true}
                  showClearButton={true}
                  helperText={fieldStates.showPasswordHelper ? dummyInputData.helperTexts.password : ''}
                />

                <InputField
                  label="Error State"
                  value={inputValues.withError}
                  onChange={handleInputChange('withError')}
                  invalid={fieldStates.showEmailError}
                  errorMessage={errorValidation}
                  placeholder="Fix the error by entering valid email"
                  showClearButton={true}
                />

                <InputField
                  label="Disabled State"
                  value={inputValues.disabled}
                  disabled={fieldStates.isDisabled}
                  placeholder={dummyInputData.disabled.placeholder}
                  helperText="This field is read-only and cannot be modified"
                />
              </div>
            </div>
          </div>
          
          {/* Additional Form Examples */}
          <div className="mt-12">
            <h3 className="text-lg font-medium text-gray-700 mb-6">Complete Form Example</h3>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="First Name"
                  value={inputValues.firstName}
                  onChange={handleInputChange('firstName')}
                  placeholder="Enter your first name"
                  showClearButton={true}
                />
                
                <InputField
                  label="Last Name"
                  value={inputValues.lastName}
                  onChange={handleInputChange('lastName')}
                  placeholder="Enter your last name"
                  showClearButton={true}
                />
                
                <InputField
                  label="Company"
                  value={inputValues.company}
                  onChange={handleInputChange('company')}
                  placeholder="Enter your company name"
                  helperText={dummyInputData.helperTexts.optional}
                />
                
                <InputField
                  label="Phone Number"
                  type="tel"
                  value={inputValues.phone}
                  onChange={handleInputChange('phone')}
                  placeholder="Enter your phone number"
                  helperText={dummyInputData.helperTexts.phone}
                />
                
                <div className="md:col-span-2">
                  <InputField
                    label="Website"
                    type="url"
                    value={inputValues.website}
                    onChange={handleInputChange('website')}
                    placeholder="Enter your website URL"
                    helperText={dummyInputData.helperTexts.website}
                    showClearButton={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DataTable Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">DataTable Component</h2>
          
          <div className="space-y-8">
            {/* Controls */}
            <div className="flex flex-wrap items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
              <Button
                onClick={toggleLoading}
                loading={buttonLoading}
                size="sm"
              >
                {tableLoading ? 'Hide Loading' : 'Show Loading'}
              </Button>
              
              {selectedRows.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Selected:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedRows.slice(0, 3).map((row, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {row.name}
                      </span>
                    ))}
                    {selectedRows.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{selectedRows.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Basic Table */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Basic Table with Sorting</h3>
              <DataTable
                data={mockTableData}
                columns={mockTableColumns}
                loading={false}
              />
            </div>

            {/* Selectable Table */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Selectable Table</h3>
              <DataTable
                data={mockTableData}
                columns={mockTableColumns}
                loading={tableLoading}
                selectable={true}
                onRowSelect={handleRowSelect}
              />
            </div>

            {/* Empty State */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Empty State</h3>
              <DataTable
                data={[]}
                columns={mockTableColumns}
                loading={false}
              />
            </div>
          </div>
        </section>

        {/* Feature Summary */}
        <section className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Component Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">InputField Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Three variants: filled, outlined, ghost</li>
                <li>✅ Three sizes: small, medium, large</li>
                <li>✅ Validation states with error messages</li>
                <li>✅ Password toggle functionality</li>
                <li>✅ Clear button option</li>
                <li>✅ Loading state support</li>
                <li>✅ Proper disabled state styling</li>
                <li>✅ Dynamic placeholders</li>
                <li>✅ Enhanced accessibility (ARIA labels)</li>
                <li>✅ Real-time validation feedback</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">DataTable Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Column sorting (ascending/descending)</li>
                <li>✅ Row selection (single/multiple)</li>
                <li>✅ Loading state with spinner</li>
                <li>✅ Enhanced empty state</li>
                <li>✅ Responsive design</li>
                <li>✅ Hover effects and visual feedback</li>
                <li>✅ Select all functionality</li>
                <li>✅ Selection count display</li>
                <li>✅ Performance optimizations</li>
                <li>✅ TypeScript generics support</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;