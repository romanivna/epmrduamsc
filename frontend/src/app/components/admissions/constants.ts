const maskTel = ['+', '3', '8', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

export const applicantsGradeFormFielder = [
  {
    type: 'select',
    name: 'Grade',
    ctrlName: 'grade',
    options: [
      {name: 'Grade 1'},
      {name: 'Grade 2-9'}
    ],
    required: true,
    shouldFocus: true
  }
];

export const applicantsFormFields = [
  {
    type: 'select',
    name: 'Department',
    ctrlName: 'department',
    options: [
      // {name: 'piano'},
      // {name: 'violin'},
      // {name: 'cello'},
      // {name: 'block flute'},
      // {name: 'percussion instruments'},
      // {name: 'guitar'},
      // {name: 'bandore'},
      // {name: 'accordion'},
      // {name: 'boys\' choir'}
    ],
    required: true,
    shouldFocus: true
  },
  {
    type: 'text',
    name: 'First Name',
    ctrlName: 'firstName',
    placeholder: 'e.g. Petro',
    minLength: 2,
    maxLength: 40,
    validators: [],
    required: true
  },
  {
    type: 'text',
    name: 'Last Name',
    ctrlName: 'lastName',
    placeholder: 'e.g. Ivanov',
    minLength: 2,
    maxLength: 40,
    required: true
  },
  {
    type: 'text',
    name: 'Middle name',
    ctrlName: 'middleName',
    placeholder: 'e.g. Vasylovych',
    maxLength: 40,
    required: false
  },
  {
    type: 'date',
    name: 'Birthday',
    ctrlName: 'birthday',
    placeholder: 'e.g. DD.MM.YYYY',
    required: true
  },
  {
    type: 'radio-group',
    name: 'Gender',
    ctrlName: 'gender',
    radios: [
      {
        type: 'radio',
        name: 'Male',
        ctrlName: 'gender',
        required: true
      },
      {
        type: 'radio',
        name: 'Female',
        ctrlName: 'gender',
        required: true
      }
    ]
  },
  {
    type: 'text-group',
    name: 'Permanent Address',
    ctrlName: 'permanentAddress',
    fields: [
      {
        type: 'text',
        name: 'Address Line',
        ctrlName: 'addressLine',
        placeholder: 'e.g. 4 Shpak St., apartment 1',
        minLength: 2,
        maxLength: 40,
        required: true
      },
      {
        type: 'text',
        name: 'City',
        ctrlName: 'city',
        placeholder: 'e.g. Kyiv',
        minLength: 2,
        maxLength: 40,
        required: true
      },
      {
        type: 'text',
        name: 'Region',
        ctrlName: 'region',
        placeholder: 'e.g. Kyivska',
        maxLength: 40,
        required: false
      },
      {
        type: 'text',
        name: 'Country',
        ctrlName: 'country',
        placeholder: 'e.g. Ukraine',
        minLength: 2,
        maxLength: 40,
        required: true
      },
      {
        type: 'text',
        name: 'Postal',
        ctrlName: 'postal',
        placeholder: 'e.g. 03113',
        maxLength: 15,
        required: false
      }
    ]
  },
  {
    type: 'text-group',
    name: 'Contact information',
    ctrlName: 'contact',
    fields: [
      {
        type: 'tel',
        name: 'Mobile telephone number',
        ctrlName: 'telephone',
        placeholder: '+38(___) ___-__-__',
        minLength: 10,
        maxLength: 20,
        mask: maskTel,
        required: false,
        Message: 'number.',
        valueDefault: '+38('
      },
      {
        type: 'email',
        name: 'Email',
        ctrlName: 'email',
        placeholder: 'e.g. youremail@company.com',
        required: false
      }
    ]
  },
  {
    type: 'radio-group',
    name: 'Hall of Residence',
    ctrlName: 'dormitory',
    radios: [
      {
        type: 'radio',
        name: 'Yes',
        ctrlName: 'dormitory',
        required: true
      },
      {
        type: 'radio',
        name: 'No',
        ctrlName: 'dormitory',
        required: true
      }
    ]
  }
];

export const parentFormFields = [
  {
    type: 'radio-group',
    name: 'Relationship to the applicant',
    ctrlName: 'relationship',
    radios: [
      {
        type: 'radio',
        name: 'Father',
        ctrlName: 'relationship',
        required: true
      },
      {
        type: 'radio',
        name: 'Mother',
        ctrlName: 'relationship',
        required: true
      },
      {
        type: 'radio',
        name: 'Guardian',
        ctrlName: 'relationship',
        required: true
      }
    ]
  },
  {
    type: 'text',
    name: 'First Name',
    ctrlName: 'firstName',
    placeholder: 'e.g. Petro',
    minLength: 2,
    maxLength: 40,
    required: true
  },
  {
    type: 'text',
    name: 'Last Name',
    ctrlName: 'lastName',
    placeholder: 'e.g. Ivanov',
    minLength: 2,
    maxLength: 40,
    required: true
  },
  {
    type: 'text',
    name: 'Middle name',
    ctrlName: 'middleName',
    placeholder: 'e.g. Vasylovych',
    maxLength: 40,
    required: false
  },
  {
    type: 'date',
    name: 'Birthday',
    ctrlName: 'birthday',
    placeholder: 'e.g. DD.MM.YYYY',
    required: false
  },
  {
    type: 'radio-group',
    name: 'Gender',
    ctrlName: 'gender',
    radios: [
      {
        type: 'radio',
        name: 'Male',
        ctrlName: 'gender',
        required: true
      },
      {
        type: 'radio',
        name: 'Female',
        ctrlName: 'gender',
        required: true
      }
    ]
  },
  {
    type: 'text-group',
    name: 'Permanent Address',
    ctrlName: 'permanentAddress',
    fields: [
      {
        type: 'text',
        name: 'Address Line',
        ctrlName: 'addressLine',
        placeholder: 'e.g. 4 Shpak St., apartment 1',
        minLength: 2,
        maxLength: 40,
        required: true
      },
      {
        type: 'text',
        name: 'City',
        ctrlName: 'city',
        placeholder: 'e.g. Kyiv',
        minLength: 2,
        maxLength: 40,
        required: true
      },
      {
        type: 'text',
        name: 'Region',
        ctrlName: 'region',
        placeholder: 'e.g. Kyivska',
        maxLength: 40,
        required: false
      },
      {
        type: 'text',
        name: 'Country',
        ctrlName: 'country',
        placeholder: 'e.g. Ukraine',
        minLength: 2,
        maxLength: 40,
        required: true
      },
      {
        type: 'text',
        name: 'Postal',
        ctrlName: 'postal',
        placeholder: 'e.g. 03113',
        maxLength: 15,
        required: false
      }
    ]
  },
  {
    type: 'text-group',
    name: 'Contact information',
    ctrlName: 'contact',
    fields: [
      {
        type: 'tel',
        name: 'Mobile telephone number',
        ctrlName: 'telephone',
        placeholder: '+38(___) ___-__-__',
        minLength: 10,
        maxLength: 20,
        mask: maskTel,
        required: true,
        errMessage: 'number.',
        valueDefault: '+38('
      },
      {
        type: 'email',
        name: 'Email',
        ctrlName: 'email',
        placeholder: 'e.g. youremail@company.com',
        required: false
      }
    ]
  }
];

