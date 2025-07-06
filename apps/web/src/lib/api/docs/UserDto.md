# UserDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**role** | [**UserRole**](UserRole.md) | Role of the user | [default to undefined]
**id** | **string** | Unique identifier of the user | [default to undefined]
**name** | **string** | Name of the user | [default to undefined]
**email** | **string** | Email address of the user | [default to undefined]
**banned** | **boolean** | Determins whether user is banned | [default to undefined]
**profile** | **string** | Profile description or URL of the user | [default to undefined]
**birthday** | **string** | Birthday of the user | [default to undefined]

## Example

```typescript
import { UserDto } from './api';

const instance: UserDto = {
    role,
    id,
    name,
    email,
    banned,
    profile,
    birthday,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
