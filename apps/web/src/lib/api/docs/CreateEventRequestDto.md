# CreateEventRequestDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**status** | [**EventStatus**](EventStatus.md) | Status of the event | [default to undefined]
**title** | **string** | Title of the event | [default to undefined]
**description** | **string** | Description of the event | [default to undefined]
**date** | **string** | Date of the event | [default to undefined]
**type** | **string** | Type of the event | [default to undefined]
**maxParticipants** | **number** | Maximum number of participants | [default to undefined]
**longitude** | **number** | Longitude of the event location | [default to undefined]
**latitude** | **number** | Latitude of the event location | [default to undefined]
**location** | **string** | Name of the event location | [default to undefined]
**banner** | **string** | Link to the event banner | [default to undefined]

## Example

```typescript
import { CreateEventRequestDto } from './api';

const instance: CreateEventRequestDto = {
    status,
    title,
    description,
    date,
    type,
    maxParticipants,
    longitude,
    latitude,
    location,
    banner,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
