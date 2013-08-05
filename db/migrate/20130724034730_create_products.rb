class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.string :description
<<<<<<< HEAD
      t.string :conekta_id
      t.string :where_value
      t.string :order_type
=======
>>>>>>> 0e98ad2b23d969d5fc0e659075fb655a013323bf
      t.decimal :price
      t.string :currency
      t.decimal :weight
      t.string :image_url

      t.timestamps
    end
  end
end
