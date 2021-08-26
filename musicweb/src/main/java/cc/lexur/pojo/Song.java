package cc.lexur.pojo;

import java.util.Date;

public class Song {
    private Integer id;

    private Integer genreId;

    private Integer adminId;

    private String title;

    private String language;

    private String source;

    private String poster;

    private String author;

    private Long collection = Long.valueOf(0);

    private Integer status = 1;

    private Date publishTime;

    private Date offlineTime;

    private Date createTime;

    @Override
    public String toString() {
        return "Song{" +
                "id=" + id +
                ", genreId=" + genreId +
                ", adminId=" + adminId +
                ", title='" + title + '\'' +
                ", language='" + language + '\'' +
                ", source='" + source + '\'' +
                ", poster='" + poster + '\'' +
                ", author='" + author + '\'' +
                ", collection=" + collection +
                ", status=" + status +
                ", publishTime=" + publishTime +
                ", offlineTime=" + offlineTime +
                ", createTime=" + createTime +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getGenreId() {
        return genreId;
    }

    public void setGenreId(Integer genreId) {
        this.genreId = genreId;
    }

    public Integer getAdminId() {
        return adminId;
    }

    public void setAdminId(Integer adminId) {
        this.adminId = adminId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language == null ? null : language.trim();
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source == null ? null : source.trim();
    }

    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster == null ? null : poster.trim();
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author == null ? null : author.trim();
    }

    public Long getCollection() {
        return collection;
    }

    public void setCollection(Long collection) {
        this.collection = collection;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getPublishTime() {
        return publishTime;
    }

    public void setPublishTime(Date publishTime) {
        this.publishTime = publishTime;
    }

    public Date getOfflineTime() {
        return offlineTime;
    }

    public void setOfflineTime(Date offlineTime) {
        this.offlineTime = offlineTime;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}