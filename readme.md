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

GET ALL
```
curl --location 'localhost:8080/all-users'
```

GET BY ID
```
curl --location 'localhost:8080/user?id=1'
```

POST
```
curl --location 'localhost:8080/user' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Elio"
}'
```

PUT
```
curl --location --request PUT 'localhost:8080/user?id=2' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Filippo",
    "isDeleted": false
}'
```

DELETE
```
curl --location --request DELETE 'localhost:8080/user?id=2'
```