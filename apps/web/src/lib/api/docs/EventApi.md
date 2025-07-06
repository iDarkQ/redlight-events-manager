# EventApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**eventControllerCreate**](#eventcontrollercreate) | **POST** /event | |
|[**eventControllerFindAll**](#eventcontrollerfindall) | **GET** /event | |
|[**eventControllerFindOne**](#eventcontrollerfindone) | **GET** /event/{id} | |
|[**eventControllerJoin**](#eventcontrollerjoin) | **PATCH** /event/join/{id} | |
|[**eventControllerLeave**](#eventcontrollerleave) | **PATCH** /event/leave/{id} | |
|[**eventControllerRemove**](#eventcontrollerremove) | **DELETE** /event/{id} | |
|[**eventControllerUpdate**](#eventcontrollerupdate) | **PUT** /event/{id} | |
|[**eventControllerUploadEventPhoto**](#eventcontrolleruploadeventphoto) | **POST** /event/photo | |

# **eventControllerCreate**
> EventDto eventControllerCreate(createEventRequestDto)


### Example

```typescript
import {
    EventApi,
    Configuration,
    CreateEventRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new EventApi(configuration);

let createEventRequestDto: CreateEventRequestDto; //

const { status, data } = await apiInstance.eventControllerCreate(
    createEventRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createEventRequestDto** | **CreateEventRequestDto**|  | |


### Return type

**EventDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Creates and returns new event |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **eventControllerFindAll**
> Array<EventDto> eventControllerFindAll()


### Example

```typescript
import {
    EventApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EventApi(configuration);

const { status, data } = await apiInstance.eventControllerFindAll();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<EventDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Returns all existing events |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **eventControllerFindOne**
> EventDto eventControllerFindOne()


### Example

```typescript
import {
    EventApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EventApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.eventControllerFindOne(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**EventDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Returns specific event based on id |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **eventControllerJoin**
> EventDto eventControllerJoin()


### Example

```typescript
import {
    EventApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EventApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.eventControllerJoin(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**EventDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | User joined selected event |  -  |
|**400** | Already part of event |  -  |
|**404** | Event does not exist |  -  |
|**409** | Event is full |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **eventControllerLeave**
> EventDto eventControllerLeave()


### Example

```typescript
import {
    EventApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EventApi(configuration);

let id: string; // (default to undefined)
let userId: string; //Unique identifier of the user (optional) (default to undefined)

const { status, data } = await apiInstance.eventControllerLeave(
    id,
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|
| **userId** | [**string**] | Unique identifier of the user | (optional) defaults to undefined|


### Return type

**EventDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | User left selected event |  -  |
|**400** | Creator cannot leave its own event or Not part of event |  -  |
|**403** | Only admins can remove other users from an event |  -  |
|**404** | Event does not exist |  -  |
|**409** | Event is already completed |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **eventControllerRemove**
> eventControllerRemove()


### Example

```typescript
import {
    EventApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EventApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.eventControllerRemove(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successfully deleted event |  -  |
|**401** | You don\&#39;t own this event |  -  |
|**404** | Event does not exist |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **eventControllerUpdate**
> EventDto eventControllerUpdate(updateEventDto)


### Example

```typescript
import {
    EventApi,
    Configuration,
    UpdateEventDto
} from './api';

const configuration = new Configuration();
const apiInstance = new EventApi(configuration);

let id: string; // (default to undefined)
let updateEventDto: UpdateEventDto; //

const { status, data } = await apiInstance.eventControllerUpdate(
    id,
    updateEventDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateEventDto** | **UpdateEventDto**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**EventDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Updates event by id |  -  |
|**403** | Only admins can edit events from other users |  -  |
|**404** | Event does not exist |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **eventControllerUploadEventPhoto**
> UploadBannerResponse eventControllerUploadEventPhoto()


### Example

```typescript
import {
    EventApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EventApi(configuration);

let photo: File; // (optional) (default to undefined)

const { status, data } = await apiInstance.eventControllerUploadEventPhoto(
    photo
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **photo** | [**File**] |  | (optional) defaults to undefined|


### Return type

**UploadBannerResponse**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successfully uploaded file |  -  |
|**400** | File upload failed |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

