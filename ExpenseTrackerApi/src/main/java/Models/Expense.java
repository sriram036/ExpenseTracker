package Models;

import java.util.Date;

public class Expense {
    private long id;
    private float amount;
    private String category;
    private String description;
    private Date date;
    private Date createdAt;

    public float getId() { return id; }
    public float getAmount() {
        return amount;
    }
    public String getCategory() {
        return category;
    }
    public String getDescription() {
        return description;
    }
    public Date getDate() { return date; }
    public Date getCreatedAt() {
        return createdAt;
    }

    public void setId(long id) {
        this.id = id;
    }
    public void setAmount(float amount) {
        this.amount = amount;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public void setDate(Date date) {
        this.date = date;
    }
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
