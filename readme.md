## Repository Pattern

- See my investigation [here](https://github.com/FeelHippo/personal_knowledge_base/blob/main/interviewQuestions.md#active-record)
- See my implementation of Inversion of Control [here](https://github.com/FeelHippo/conversational_commerce/tree/main/inversion_of_control)
- [Goal](https://miro.medium.com/v2/resize:fit:720/format:webp/0*B5a9lPhBRsnQ8Tzp.png)

In this little project, I explore and implement a basic [repository pattern](https://martinfowler.com/eaaCatalog/repository.html. 

The [role of the repository](https://github.com/FeelHippo/conversational_commerce/tree/main/inversion_of_control) is to abstract data sources.
The data source in this case, is a PostgreSQL database. 

The *data mapper pattern*, in contrast to the active record pattern, ensures domain objects only contain business rules.
Any task related to database operations is handed over to the data mapper layer.

The *Repository Layer* centralizes the query construction code, providing a more object-oriented way of communicating with a collection of objects.


## Requests

```
curl --location --request OPTIONS 'localhost:8080/preflight-request' \
--header 'Host: localhost:3000' \
--header 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' \
--header 'Accept-Language: en-us,en;q=0.5' \
--header 'Accept-Encoding: gzip,deflate' \
--header 'Origin: localhost:3000' \
--header 'Access-Control-Request-Method: POST' \
--header 'Access-Control-Request-Headers: content-type,x-pingother' \
--header 'Warning: A non-standard HTTP X-PINGOTHER request header is set. Such headers are not part of HTTP/1.1, but are generally useful to web applications. Since the request uses a Content-Type of text/xml, and since a custom header is set, this request is preflighted'
```

...

```
curl --location 'localhost:8080/main-request' \
--header 'Content-Type: multipart/form-data' \
--header 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' \
--header 'Accept-Encoding: gzip,deflate' \
--header 'X-PINGOTHER: pingpong' \
--header 'Content-Type: text/xml; charset=UTF-8' \
--header 'Referer: https://foo.example/examples/preflightInvocation.html' \
--header 'Pragma: no-cache' \
--header 'Cache-Control: no-cache' \
--header 'Origin: localhost:3000' \
--data '"<person><name>Arun</name></person>"'
```