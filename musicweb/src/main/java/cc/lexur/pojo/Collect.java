package cc.lexur.pojo;

public class Collect {
    private Long id;

    private Integer songId;

    private Integer userId;

    @Override
    public String toString() {
        return "Collect{" +
                "id=" + id +
                ", songId=" + songId +
                ", userId=" + userId +
                '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSongId() {
        return songId;
    }

    public void setSongId(Integer songId) {
        this.songId = songId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}