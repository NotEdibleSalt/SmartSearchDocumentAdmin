# 账户Controller

## 1.查询账户

### 基本信息

**请求方法**: `GET`

**请求路径**: `/account/{id}`

**描述**: 

   <pre><code>    /**
     * 查询账户
     *
     * @param id 账户id
     * @return cn.exrick.xboot.common.vo.Result&lt;com.smartsearchdocument.entity.AccountDO&gt;
     * @author NotEdibleSalt
     */
    @GetMapping("{id}")
    public Result&lt;AccountDO&gt; getAccountById(@RequestParam("id") String id) </code></pre>

### 请求参数

`查询参数`: 

| 名称 | 必选 | 类型 | 默认值 | 描述 |
|-----|-----|-----|-----|-----|
| id | 是 | string |  | 账户id |


### 响应数据

| 名称 | 必选 | 类型 | 默认值 | 描述 |
|-----|-----|-----|-----|-----|
| success | 否 | boolean |  |  |
| msg | 否 | string |  |  |
| code | 否 | integer |  |  |
| result | 否 | object |  | 结果对象 |
| &nbsp;&nbsp;├ name | 否 | string |  | 姓名 |
| &nbsp;&nbsp;├ username | 否 | string |  | 用户名 |
| &nbsp;&nbsp;├ phone | 否 | string |  | 手机号 |
| &nbsp;&nbsp;├ email | 否 | string |  | 邮箱 |
| &nbsp;&nbsp;├ password | 否 | string |  | 密码 |
| &nbsp;&nbsp;├ status | 否 | string |  | 状态 ENABLE： 启用  DISABLE：禁用 |
| &nbsp;&nbsp;├ id | 否 | string |  |  |
| &nbsp;&nbsp;├ createBy | 否 | string |  |  |
| &nbsp;&nbsp;├ createTime | 否 | string |  |  |
| &nbsp;&nbsp;├ updateBy | 否 | string |  |  |
| &nbsp;&nbsp;├ updateTime | 否 | string |  |  |
| &nbsp;&nbsp;├ notDel | 否 | boolean |  | 删除标识，1: 未删除，0: 已删除 |

## 2.分页查询账户

### 基本信息

**请求方法**: `GET`

**请求路径**: `/account`

**描述**: 

   <pre><code>    /**
     * 分页查询账户
     *
     * @param accountPagingDTO 分页查询账户参数
     * @param pageVo           分页查询参数
     * @return cn.exrick.xboot.common.vo.Result&lt;org.springframework.data.domain.Page &lt; com.smartsearchdocument.entity.Account&gt;&gt;
     * @author NotEdibleSalt
     */
    @GetMapping("")
    public Result&lt;Page&lt;AccountDO&gt;&gt; accountPaging(AccountPagingDTO accountPagingDTO, Pageable pageVo) </code></pre>

### 请求参数

`查询参数`: 

| 名称 | 必选 | 类型 | 默认值 | 描述 |
|-----|-----|-----|-----|-----|
| name | 否 | string |  | 姓名 |
| username | 否 | string |  | 用户名 |
| phone | 否 | string |  | 手机号 |
| email | 否 | string |  | 邮箱 |
| password | 否 | string |  | 密码 |
| status | 否 | string |  | 状态 ENABLE： 启用  DISABLE：禁用 |
| random | 否 | string |  | 随机值 |
| page | 否 | integer |  | 页码 |
| size | 否 | integer |  | 每页大小 |
| sort | 否 | string |  | 排序 |


### 响应数据

| 名称 | 必选 | 类型 | 默认值 | 描述 |
|-----|-----|-----|-----|-----|
| success | 否 | boolean |  |  |
| msg | 否 | string |  |  |
| code | 否 | integer |  |  |
| result | 否 | object |  | 结果对象 |
| &nbsp;&nbsp;├ totalPages | 是 | integer |  | 总页数 |
| &nbsp;&nbsp;├ totalElements | 是 | integer |  | 总条数 |
| &nbsp;&nbsp;├ content | 是 | object[] |  | 数据列表 |
| &nbsp;&nbsp;&nbsp;&nbsp;├ name | 否 | string |  | 姓名 |
| &nbsp;&nbsp;&nbsp;&nbsp;├ username | 否 | string |  | 用户名 |
| &nbsp;&nbsp;&nbsp;&nbsp;├ phone | 否 | string |  | 手机号 |
| &nbsp;&nbsp;&nbsp;&nbsp;├ email | 否 | string |  | 邮箱 |
| &nbsp;&nbsp;&nbsp;&nbsp;├ password | 否 | string |  | 密码 |
| &nbsp;&nbsp;&nbsp;&nbsp;├ status | 否 | string |  | 状态 ENABLE： 启用  DISABLE：禁用 |
| &nbsp;&nbsp;&nbsp;&nbsp;├ id | 否 | string |  |  |
| &nbsp;&nbsp;&nbsp;&nbsp;├ createBy | 否 | string |  |  |
| &nbsp;&nbsp;&nbsp;&nbsp;├ createTime | 否 | string |  |  |
| &nbsp;&nbsp;&nbsp;&nbsp;├ updateBy | 否 | string |  |  |
| &nbsp;&nbsp;&nbsp;&nbsp;├ updateTime | 否 | string |  |  |
| &nbsp;&nbsp;&nbsp;&nbsp;├ notDel | 否 | boolean |  | 删除标识，1: 未删除，0: 已删除 |
| &nbsp;&nbsp;├ first | 是 | boolean |  | 是否第一页 |
| &nbsp;&nbsp;├ last | 是 | boolean |  | 是否最后一页 |

## 3.注册账号

### 基本信息

**请求方法**: `POST`

**请求路径**: `/account/register`

**描述**: 

   <pre><code>    /**
     * 注册账号
     *
     * @param registerAccount 注册账号参数
     * @return com.smartsearchdocument.common.Result&lt;com.smartsearchdocument.dos.AccountDO&gt;
     * @author NotEdibleSalt
     */
    @PostMapping("register")
    public Result&lt;AccountDO&gt; register(@RequestBody RegisterAccount registerAccount) </code></pre>

### 请求参数

`请求体`: 

| 名称 | 必选 | 类型 | 默认值 | 描述 |
|-----|-----|-----|-----|-----|
| name | 是 | string |  | 姓名 |
| username | 是 | string |  | 用户名 |
| phone | 否 | string |  | 手机号 |
| email | 否 | string |  | 邮箱 |
| password | 是 | string |  | 密码 |
| confirmPassword | 是 | string |  | 确认密码 |

### 响应数据

| 名称 | 必选 | 类型 | 默认值 | 描述 |
|-----|-----|-----|-----|-----|
| success | 否 | boolean |  |  |
| msg | 否 | string |  |  |
| code | 否 | integer |  |  |
| result | 否 | object |  | 结果对象 |
| &nbsp;&nbsp;├ name | 否 | string |  | 姓名 |
| &nbsp;&nbsp;├ username | 否 | string |  | 用户名 |
| &nbsp;&nbsp;├ phone | 否 | string |  | 手机号 |
| &nbsp;&nbsp;├ email | 否 | string |  | 邮箱 |
| &nbsp;&nbsp;├ password | 否 | string |  | 密码 |
| &nbsp;&nbsp;├ status | 否 | string |  | 状态 ENABLE： 启用  DISABLE：禁用 |
| &nbsp;&nbsp;├ id | 否 | string |  |  |
| &nbsp;&nbsp;├ createBy | 否 | string |  |  |
| &nbsp;&nbsp;├ createTime | 否 | string |  |  |
| &nbsp;&nbsp;├ updateBy | 否 | string |  |  |
| &nbsp;&nbsp;├ updateTime | 否 | string |  |  |
| &nbsp;&nbsp;├ notDel | 否 | boolean |  | 删除标识，1: 未删除，0: 已删除 |

## 4.登录

### 基本信息

**请求方法**: `POST`

**请求路径**: `/account/login`

**描述**: 

   <pre><code>    /**
     * 登录
     *
     * @param loginDTO 登录参数
     * @return com.smartsearchdocument.common.Result&lt;cn.dev33.satoken.util.SaResult&gt;
     * @author NotEdibleSalt
     */
    @PostMapping("login")
    public Result&lt;SaResult&gt; login(@RequestBody LoginDTO loginDTO) </code></pre>

### 请求参数

`请求体`: 

| 名称 | 必选 | 类型 | 默认值 | 描述 |
|-----|-----|-----|-----|-----|
| username | 是 | string |  | 用户名 |
| password | 是 | string |  | 密码 |

### 响应数据

| 名称 | 必选 | 类型 | 默认值 | 描述 |
|-----|-----|-----|-----|-----|
| success | 否 | boolean |  |  |
| msg | 否 | string |  |  |
| code | 否 | integer |  |  |
| result | 否 | object |  | 结果对象 |

