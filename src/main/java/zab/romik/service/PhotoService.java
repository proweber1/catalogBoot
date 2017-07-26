package zab.romik.service;

import zab.romik.entity.Photo;

import java.util.List;

public interface PhotoService {

    void save(Photo photo);

    List<Photo> findAll();

    Photo findOne(long id);

    void delete(long id);

    void update (Photo photo);
}