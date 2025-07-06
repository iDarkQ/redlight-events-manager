# UserApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**userControllerAuthorize**](#usercontrollerauthorize) | **POST** /user/auth | |
|[**userControllerBanUser**](#usercontrollerbanuser) | **PATCH** /user/ban/{id} | |
|[**userControllerFetchAll**](#usercontrollerfetchall) | **GET** /user | |
|[**userControllerSignIn**](#usercontrollersignin) | **POST** /user/signIn | |
|[**userControllerSignUp**](#usercontrollersignup) | **POST** /user/signUp | |
|[**userControllerUpdate**](#usercontrollerupdate) | **PATCH** /user/profile | |
|[**userControllerUpdateRole**](#usercontrollerupdaterole) | **PATCH** /user/role/{id} | |
|[**userControllerUploadProfilePhoto**](#usercontrolleruploadprofilephoto) | **POST** /user/profile/picture | |

# **userControllerAuthorize**
> UserDto userControllerAuthorize(jwtTokenDto)


### Example

```typescript
import {
    UserApi,
    Configuration,
    JwtTokenDto
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let jwtTokenDto: JwtTokenDto; //

const { status, data } = await apiInstance.userControllerAuthorize(
    jwtTokenDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **jwtTokenDto** | **JwtTokenDto**|  | |


### Return type

**UserDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Returns user object |  -  |
|**404** | This user does not exists |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **userControllerBanUser**
> UserDto userControllerBanUser(banUserDto)


### Example

```typescript
import {
    UserApi,
    Configuration,
    BanUserDto
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let id: string; // (default to undefined)
let banUserDto: BanUserDto; //

const { status, data } = await apiInstance.userControllerBanUser(
    id,
    banUserDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **banUserDto** | **BanUserDto**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**UserDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Returns the updated user |  -  |
|**401** | You need to be admin to do it |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **userControllerFetchAll**
> Array<ParticipantDto> userControllerFetchAll()


### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

const { status, data } = await apiInstance.userControllerFetchAll();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<ParticipantDto>**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Returns all existing users |  -  |
|**401** | You are not an admin |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **userControllerSignIn**
> JwtTokenDto userControllerSignIn(loginUserDto)


### Example

```typescript
import {
    UserApi,
    Configuration,
    LoginUserDto
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let loginUserDto: LoginUserDto; //

const { status, data } = await apiInstance.userControllerSignIn(
    loginUserDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **loginUserDto** | **LoginUserDto**|  | |


### Return type

**JwtTokenDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | JWT Token |  -  |
|**401** | Provided password was wrong |  -  |
|**404** | User with this email does not exist |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **userControllerSignUp**
> JwtTokenDto userControllerSignUp(createUserDto)


### Example

```typescript
import {
    UserApi,
    Configuration,
    CreateUserDto
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let createUserDto: CreateUserDto; //

const { status, data } = await apiInstance.userControllerSignUp(
    createUserDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createUserDto** | **CreateUserDto**|  | |


### Return type

**JwtTokenDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | JWT Token |  -  |
|**409** | User with this email, username, or credentials already exists |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **userControllerUpdate**
> UserDto userControllerUpdate(updateProfileDto)


### Example

```typescript
import {
    UserApi,
    Configuration,
    UpdateProfileDto
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let updateProfileDto: UpdateProfileDto; //

const { status, data } = await apiInstance.userControllerUpdate(
    updateProfileDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateProfileDto** | **UpdateProfileDto**|  | |


### Return type

**UserDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Returns user object |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **userControllerUpdateRole**
> UserDto userControllerUpdateRole(updateRoleDto)


### Example

```typescript
import {
    UserApi,
    Configuration,
    UpdateRoleDto
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let id: string; // (default to undefined)
let updateRoleDto: UpdateRoleDto; //

const { status, data } = await apiInstance.userControllerUpdateRole(
    id,
    updateRoleDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateRoleDto** | **UpdateRoleDto**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**UserDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Returns the updated user |  -  |
|**401** | You are not an admin |  -  |
|**404** | This user does not exist |  -  |
|**409** | You can\&#39;t change role of the default admin |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **userControllerUploadProfilePhoto**
> UploadBannerResponse userControllerUploadProfilePhoto()


### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let photo: File; // (optional) (default to undefined)

const { status, data } = await apiInstance.userControllerUploadProfilePhoto(
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

