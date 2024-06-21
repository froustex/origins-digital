create table user (
  id int unsigned primary key auto_increment not null,
  username varchar(50) not null unique,
  email varchar(255) not null unique,
  hashed_password varchar(255) not null,
  role varchar(50) not null,
  avatar varchar(255),
  created_at date
);

create table video {
  id int unsigned primary key auto_increment not null,
  title varchar(100) not null,
  decription text not null,
  thumbnail varchar(255) not null,
  isPrivate boolean not null,
  source varchar(255) not null,
  created_at date
};

create table commenting {
  id int unsigned primary key auto_increment not null,
  comment varchar(255),
  user_id int unsigned not null,
  foreign key(user_id) references user(id),
  video_id int unsigned not null,
  foreign key(video_id) references video(id),
  created_at date
}

create table rating {
  rating int,
  user_id int unsigned not null,
  foreign key(user_id) references user(id),
  video_id int unsigned not null,
  foreign key(video_id) references video(id),
  created_at date
}

create table add_favorite {
  user_id int unsigned not null,
  foreign key(user_id) references user(id),
  video_id int unsigned not null,
  foreign key(video_id) references video(id),
  created_at date
}

create table category {
id int unsigned primary key auto_increment not null,
name varchar(50) not null  
}

create table add_category {
  id int unsigned primary key auto_increment not null,
  category_id int unsigned not null,
  foreign key(category_id) references category(id),
  video_id int unsigned not null,
  foreign key(video_id) references video(id)
}


create table item (
  id int unsigned primary key auto_increment not null,
  title varchar(255) not null,
  user_id int unsigned not null,
  foreign key(user_id) references user(id)
);


