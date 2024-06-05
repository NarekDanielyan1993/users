export const FILE_ERROR_MESSAGES = {
    FILE_READ: 'Error occurred while reading the file.',
    FILE_GET: 'Error occurred while retrieving the file.',
    FILES_GET: 'Error occurred while retrieving the files.',
    FILE_CREATE: 'Error occurred while creating the file.',
    FILE_UPDATE: 'Error occurred while updating the file.',
    FILE_DELETE: 'Error occurred while deleting the file.',
    LIMIT_FILE_SIZE: 'File size exceeds the limit: 10MB',
    FILE_NOT_FOUND: 'File not found',
    FILE_TYPE: 'File type not allowed. Only PNG and JPG files are allowed.',
    DEFAULT: 'File upload error',
};

export const USER_ERROR_MESSAGES = {
    VERIFY_PASSWORD: 'Error verifying password',
    ENCRYPT_PASSWORD: 'Error encrypting password',
    CREATE_USER: 'An error occurred while creating the User.',
    UPDATE_USER: 'An error occurred while updating the User.',
    GET_USERS: 'An error occurred while getting Users.',
    GET_USER: 'An error occurred while finding the User.',
    EXIST_USER: 'User with this email already exists',
    NOT_FOUND_USER: 'User not found',
    INCORRECT_PASSWORD: 'Password is incorrect',
};

export const USER_VALIDATION_ERRORS = {
    EMAIL: 'Please enter a valid email.',
    PASSWORD_MIN: 'Password must be at least 6 characters long.',
    PASSWORD_MAX: 'Password cannot exceed 32 characters in length.',
    MAX: 'Name cannot exceed 32 characters in length.',
    MIN: 'Required.',
};
