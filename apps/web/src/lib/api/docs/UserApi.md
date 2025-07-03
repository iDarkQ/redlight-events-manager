# UserApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**userControllerAuthorize**](#usercontrollerauthorize) | **POST** /user/auth | |
|[**userControllerSignIn**](#usercontrollersignin) | **POST** /user/signIn | |
|[**userControllerSignUp**](#usercontrollersignup) | **POST** /user/signUp | |
|[**userControllerUpdate**](#usercontrollerupdate) | **PATCH** /user/profile | |
|[**userControllerUploadProfilePhoto**](#usercontrolleruploadprofilephoto) | **POST** /user/profile/picture | |

# **userControllerAuthorize**
> UserDto userControllerAuthorize(authorizeUserDto)


### Example

```typescript
import {
    UserApi,
    Configuration,
    AuthorizeUserDto
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let authorizeUserDto: AuthorizeUserDto; //

const { status, data } = await apiInstance.userControllerAuthorize(
    authorizeUserDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **authorizeUserDto** | **AuthorizeUserDto**|  | |


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
|**401** | Could not authorize your session |  -  |
|**404** | User does not exists |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **userControllerSignIn**
> JwtTokenResponse userControllerSignIn(loginUserDto)


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

**JwtTokenResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | JWT Token |  -  |
|**401** | Wrong Password |  -  |
|**404** | User with this email does not exist |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **userControllerSignUp**
> JwtTokenResponse userControllerSignUp(createUserDto)


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

**JwtTokenResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | JWT Token |  -  |
|**409** | User already exists |  -  |

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

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

