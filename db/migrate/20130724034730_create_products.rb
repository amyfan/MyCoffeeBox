class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.string :description
      t.decimal :price
      t.string :currency
      t.decimal :weight
      t.string :image_url

      t.timestamps
    end
  end
end
