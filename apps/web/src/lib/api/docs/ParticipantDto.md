# ParticipantDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**role** | [**UserRole**](UserRole.md) | Role of the user | [default to undefined]
**id** | **string** | Unique identifier of the user | [default to undefined]
**name** | **string** | Name of the user | [default to undefined]
**profile** | **string** | Profile description or URL of the user | [default to undefined]
**banned** | **boolean** | Determins whether user is banned | [default to undefined]

## Example

```typescript
import { ParticipantDto } from './api';

const instance: ParticipantDto = {
    role,
    id,
    name,
    profile,
    banned,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
