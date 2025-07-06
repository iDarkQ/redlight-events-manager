# EventDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**participants** | [**Array&lt;ParticipantDto&gt;**](ParticipantDto.md) |  | [default to undefined]
**status** | [**EventStatus**](EventStatus.md) | Status of the event | [default to undefined]
**id** | **string** | Unique identifier of the event | [default to undefined]
**title** | **string** | Title of the event | [default to undefined]
**description** | **string** | Description of the event | [default to undefined]
**createdAt** | **string** | Date when the event was created | [default to undefined]
**date** | **string** | Date when event happens | [default to undefined]
**type** | **string** | Type of the event | [default to undefined]
**maxParticipants** | **number** | Maximum number of participants | [default to undefined]
**creatorId** | **string** | ID of the event creator | [default to undefined]
**longitude** | **number** | Longitude of the event location | [default to undefined]
**latitude** | **number** | Latitude of the event location | [default to undefined]
**location** | **string** | Name of the event location | [default to undefined]
**deleted** | **boolean** | Is event soft deleted | [default to undefined]
**deletedAt** | **string** | Deletion date | [default to undefined]
**banner** | **string** | Link to the event banner | [default to undefined]

## Example

```typescript
import { EventDto } from './api';

const instance: EventDto = {
    participants,
    status,
    id,
    title,
    description,
    createdAt,
    date,
    type,
    maxParticipants,
    creatorId,
    longitude,
    latitude,
    location,
    deleted,
    deletedAt,
    banner,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
