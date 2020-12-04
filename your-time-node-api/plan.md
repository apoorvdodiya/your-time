#### Tables:
- user
  - id              PK
  - email
  - password

- profile
  - profile_id      PK
  - user_id         FK 1-1
  - f_name
  - l_name
  - profile_pic_url
  - {...}

- feed ??
  - 
- posts ??
  - post_id         PK
  - user_id         FK *-1
  - content
  - likes
  - comments*

- friends ?? friendship


- messages ??