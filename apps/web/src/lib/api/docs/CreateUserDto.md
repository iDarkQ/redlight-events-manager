# CreateUserDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** | User\&#39;s full name. | [default to undefined]
**email** | **string** | User\&#39;s email address. | [default to undefined]
**password** | **string** | User\&#39;s account password. Must be between 6 and 100 characters. | [default to undefined]
**birthday** | **string** | User\&#39;s date of birth. ISO 8601 date format. | [default to undefined]

## Example

```typescript
import { CreateUserDto } from './api';

const instance: CreateUserDto = {
    name,
    email,
    password,
    birthday,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
