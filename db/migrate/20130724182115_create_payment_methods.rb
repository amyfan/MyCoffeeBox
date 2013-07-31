class CreatePaymentMethods < ActiveRecord::Migration
  def change
    create_table :payment_methods do |t|
      t.string :payment_type
      t.integer :last4
      t.string :address_one
      t.string :address_two
      t.string :city
      t.string :state
      t.string :postal_code
      t.string :country
      t.string :phone

      t.timestamps
    end
  end
end
