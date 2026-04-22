package Service;

import Models.Expense;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ExpenseTrackerBal {
    private final String FILE_PATH = "/tmp/expenses.json";
    private final ObjectMapper mapper = new ObjectMapper();

    public List<Expense> getAllExpenses() throws IOException {

        File file = new File(FILE_PATH);

        if (!file.exists() || file.length() == 0) {
            return new ArrayList<>();
        }

        return mapper.readValue(file, new TypeReference<>() {
        });
    }
    public void saveExpenses(Expense expense) {
        try {
            List<Expense> expenses = getAllExpenses();
            long maxId = expenses.size();
            expense.setId(maxId+1);
            ZonedDateTime istTime = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));
            expense.setCreatedAt(Date.from(istTime.toInstant()));
            expenses.add(expense);

            mapper.writeValue(new File(FILE_PATH), expenses);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
