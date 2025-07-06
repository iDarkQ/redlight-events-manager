# UpdateEventDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**status** | [**EventStatus**](EventStatus.md) | Status of the event | [optional] [default to undefined]
**title** | **string** | Title of the event | [optional] [default to undefined]
**description** | **string** | Description of the event | [optional] [default to undefined]
**date** | **string** | Date when event happens | [optional] [default to undefined]
**type** | **string** | Type of the event | [optional] [default to undefined]
**maxParticipants** | **number** | Maximum number of participants | [optional] [default to undefined]
**longitude** | **number** | Longitude of the event location | [optional] [default to undefined]
**latitude** | **number** | Latitude of the event location | [optional] [default to undefined]
**location** | **string** | Name of the event location | [optional] [default to undefined]
**banner** | **string** | Link to the event banner | [optional] [default to undefined]

## Example

```typescript
import { UpdateEventDto } from './api';

const instance: UpdateEventDto = {
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
