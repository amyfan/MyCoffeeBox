class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.string :description
      t.string :conekta_id
      t.string :where_value
      t.string :order_type
      t.decimal :price
      t.string :currency
      t.decimal :weight
      t.string :image_url

      t.timestamps
    end
  end
end
