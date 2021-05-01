package com.ikinsure.filmbook.image;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Objects;

@Entity(name = "Image")
@Table(name = "image")
public class Image {

    @Id
    @SequenceGenerator(name = "image_sequence", sequenceName = "image_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "image_sequence")
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "name", nullable = false, columnDefinition = "TEXT")
    private String name;

    @Column(name = "type", nullable = false, columnDefinition = "TEXT")
    private String type;

    @Lob
    @Type(type="org.hibernate.type.BinaryType")
    @Column(name = "data", nullable = false, columnDefinition = "BYTEA")
    private byte[] data;

    public Image() {
    }

    public Image(String name, String type, byte[] data) {
        this.name = name;
        this.type = type;
        this.data = data;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Image image = (Image) o;
        return Objects.equals(id, image.id) &&
               Objects.equals(name, image.name) &&
               Objects.equals(type, image.type) &&
               Arrays.equals(data, image.data);
    }

    @Override
    public int hashCode() {
        return 31 * Objects.hash(id, name, type) + Arrays.hashCode(data);
    }

    @Override
    public String toString() {
        return "Image{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                '}';
    }
}
